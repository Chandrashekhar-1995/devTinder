const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.model");
const { validateSignupData } = require("./helper/auth");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {

    const { firstName, lastName, emailId, password } = req.body;
    // creating an  new stansil for user
    
    try {
        validateSignupData(req);

        const hashPassword = await bcrypt.hash(password, 10) 

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword
        });

        await user.save()
        
        const jwtToken = await jwt.sign({ _id: user._id }, "MybestFriend123123@");

        res.cookie("token ", jwtToken);
        res.send("User created successfully");
        
    } catch (err) {
        res.status(400).send("Error : " + err);
    }

});

app.get("/login", async (req, res) => {
    const { emailId, password } = req.body;
 
    try {
        // check email in db
        const user = await User.findOne({ emailId: emailId });
    
        if (!user) {
            throw new Error("Invalid credentials")
        }

        //compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
        }
        
        const jwtToken = await jwt.sign({ _id: user._id }, "MybestFriend123123@");
        
        res.cookie("token ", jwtToken)
        res.send("login successfully")
        
    } catch (err) {
        res.status(400).send("Error : " + err);
    }

});

app.get("/profile", async(req, res) => {
    const { token } = req.cookies;
    try {
        const decodedMessage = jwt.verify(token, "MybestFriend123123@");
        const userId = decodedMessage._id;
        const user = await User.findOne({_id:userId});
        res.send(user)
    } catch (err) {
        res.send("Error: "+ err);
    }
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    
    try {
        const user = await User.find({ emailId: userEmail })
        
        if (user.length === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Something went wrong, whene finding the user by email", err.message)
    }
});

app.get("/user/first", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.findOne({ emailId: userEmail })
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong, whene finding the user by email", err.message)
    }
});

app.get("/user/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(501).send("User database empty");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong, whene finding the users in database", err.message)
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body._id
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");  
    } catch (err) {
        res.status(500).send("Something went wrong, whene deleting user", err.message)
    }
    
})

app.patch("/user/update", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;    
    try {
        const UPDATE_ALLOWED = ["password", "skills", "about", "photoUrl"];
        const isDataAllowed = Object.keys(data).every((k) => UPDATE_ALLOWED.includes(k));

        if (!isDataAllowed) {
            throw new Error("Upadte not allowed");
        }
        if (data?.skills.length > 1) {
            throw new Error("Skills cannot be more than 10");
        }
        if (data?.about.length > 256) {
            throw new Error("About length cannot be more than 256");
        }
        
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: 'after', runValidators:true});   
        res.send("User update sucessfully");
    } catch (err) {
        res.status(500).send("Something went wrong, whene updating user " + err.message)
    }
})

connectDB()
    .then(() => {
        console.log("Data base connection successfully stablished");
        app.listen(7777, () => {
            console.log("Server is running successfull on port 7777");
        });  
    })
    .catch((err) => {
        console.error("Database cannot be connected !!", err);
    
    });

