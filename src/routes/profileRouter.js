const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

profileRouter.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    
    try {
        const decodedMessage = jwt.verify(token, "MybestFriend123123@");
        const userId = decodedMessage._id;
        const user = await User.findOne({ _id: userId });
        res.send(user)
    } catch (err) {
        res.send("Please login again!!                  Error: " + err);
    }
});

profileRouter.get("/user", async (req, res) => {
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

profileRouter.get("/user/first", async (req, res) => {
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

profileRouter.patch("/user/update", async (req, res) => {
    const userId = req.body._id;
    const data = req.body;    
    try {
        const UPDATE_ALLOWED = ["firstName", "lastName", "about", "photoUrl","skills"];
        const isDataAllowed = Object.keys(data).every((k) => UPDATE_ALLOWED.includes(k));
        
        if (!isDataAllowed) {
            throw new Error("Upadte not allowed");
        }
        if (data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        if (data?.about.length > 256) {
            throw new Error("About length cannot be more than 256");
        }
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: 'after', runValidators: true });   
        console.log(user);
        
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send("Something went wrong, whene updating user " + err.message)
    }
})

module.exports = profileRouter;