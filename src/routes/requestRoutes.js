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




requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
    try {
        const loginUserId = req.user._id;
        const urlStatus = req.params.status;
        const urlRequestId = req.params.requestId;

        // url status = accepted/rejected
        // RequestId available in db
        // login userId = toUserId
        // request id status = intrested

        
        const allowedStatus  = ["accepted", "rejected"];
        if(!allowedStatus.includes(urlStatus)){
            return res.status(400).json({message: "invalid status type " + urlStatus})
        };

        // Find the request by ID
        const requestId = await ConnectionRequest.findById(urlRequestId);
        if (!requestId) { 
            return res.status(404).json({ message: "Connection not found" });
        };

        if(!loginUserId.equals(requestId.toUserId)){
            return res.status(400).json({ message: "User mismach" });
        };

        if (requestId.status !== "intrested"){
            return res.status(400).json({ message: "Sender not intrested in you" });
        }; 

        const connectionRequest = ConnectionRequest({
            status:urlStatus
        });

        await connectionRequest.save();

        res.send("Request processed successfully");

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = requestRouter;
