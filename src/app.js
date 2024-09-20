const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.model");


// const userObj = {
//     firstName: "Chandra",
//     lastName: "Shekhar",
//     email: "Chandra@gmail.com",
//     password: "Abc123@",
//     age: "28",
//     gender: "Male"
// }


app.post("/signup", async (req, res) => {
    // creating an  new stansil for user

    const user = new User({
        firstName: "Sanjay",
        lastName: "Singh",
        email: "Sanjay@gmail.com",
        password: "Sanjay123@",
    });

    try {
    await user.save()
        res.send("Signup successfully");
        
    } catch (err) {
        res.status(400).send("error while saving user: ", err.message);
    }

});


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

