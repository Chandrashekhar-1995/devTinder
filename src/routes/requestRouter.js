const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/auth");


requestRouter.post("/request/send/:status/:ToUserId", userAuth, async(req, res) => {
    
    try {
        const user = req.user;
        res.send( user.firstName + " sending a connection request");
        res.send(" sending a connection request");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

module.exports = requestRouter;