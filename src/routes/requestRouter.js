const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/auth");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) => {
    
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;


        const user = req.user;
        res.json({
            message: `${fromUserId} is ${status} so he sent request to ${toUserId}`,
        })
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

module.exports = requestRouter;