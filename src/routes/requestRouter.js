const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) => {
    
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        
        const allowedStatus  = ["intrested", "ignore"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "invalid status type " + status})
        };


        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: "User not found"})
        }


        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId} 
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).json({message: "already send a connection"})            
        }


        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        
       await connectionRequest.save()
        
        res.send("Request send successfully");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

module.exports = requestRouter;