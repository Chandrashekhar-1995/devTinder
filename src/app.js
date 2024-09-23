const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.model");
const { validateSignupData } = require("./helper/auth");


app.use(express.json());

app.post("/signup", async (req, res) => {

    // creating an  new stansil for user
    const user = new User(req.body);
    
    try {
        validateSignupData(req);
        
        if (user?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        if (user?.about.length > 256) {
            throw new Error("About length cannot be more than 256");
        }

    await user.save()
        res.send("User created successfully");
        
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }

});

app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    
    try {
        const user = await User.find({ email: userEmail })
        
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
    const userEmail = req.body.email;
    try {
        const user = await User.findOne({ email: userEmail })
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

