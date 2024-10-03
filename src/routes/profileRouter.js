const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
    const data = req.body;    
    const { token } = req.cookies;
    try {
        const UPDATE_ALLOWED = ["firstName", "lastName", "about", "photoUrl", "skills"];
        const isDataAllowed = Object.keys(data).every((k) => UPDATE_ALLOWED.includes(k));
        
        if (!isDataAllowed) {
            throw new Error("Update not allowed");
        }

        if (data?.skills && data.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }

        if (data?.about && data.about.length > 256) {
            throw new Error("About length cannot be more than 256");
        }

        // Find Update the user
        const userId = jwt.verify(token, "MybestFriend123123@");

        const user = await User.findByIdAndUpdate(
            userId, 
            data, 
            { returnDocument: 'after', runValidators: true }
        );   

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(`Hey ${user.firstName} your frofile updated successfully`);
    } catch (err) {
        res.status(500).send("Something went wrong while updating user: " + err.message);
    }
});

profileRouter.patch("/user/password/reset", async (req, res) => {

    //Take email, firstName, Last name, new password from body
    //search user by email in db
    //conform user email, firstName, Last name should be matched from db
    // hash new password and update in db
    
    const { firstName, lastName, emailId, newPassword } = req.body;
    try {
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("User not found Please insert correct details");
        }

        if (firstName !== user.firstName || lastName !== user.lastName) {
            throw new Error("User not found Please insert correct details");
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;

        await user.save();
        
        res.send("Password updated successfully")

        
    } catch (err) {
        res.status(500).send("Something went wrong while updating password : " + err.message);
    }
});


module.exports = profileRouter;