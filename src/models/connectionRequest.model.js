const { type, status } = require("express/lib/response");
const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    status: {
        type: String,
        enum: {
            values: ["ignore", "intrested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required: true
    },
        
},
    {
        timestamps: true
    }
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //check fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't send connection requert to yourself !")
    }
    next();
});

module.exports = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);