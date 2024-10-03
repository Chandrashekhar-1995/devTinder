const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { validateSignupData } = require("../helper/auth");




authRouter.post("/signup", async (req, res) => {

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
        
        const jwtToken = user.getJWT;

        res.cookie("token ", jwtToken);
        res.send("User created successfully");
        
    } catch (err) {
        res.status(400).send("Error : " + err);
    }

});


authRouter.get("/login", async (req, res) => {
    const { emailId, password } = req.body;

    try {
        // Check email in db
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        // Compare password using the schema method
        const isPasswordCorrect = await user.validatePassword(password);

        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials");
        }

        // Generate JWT token using user method
        const jwtToken = user.getJWT();     

        res.cookie("token", jwtToken);
        res.send("Login successfully");

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })

    res.send("Logout successfully");
})


module.exports = authRouter;