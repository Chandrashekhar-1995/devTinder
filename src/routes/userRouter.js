const express = require("express");
const userRouter = express.Router();


userRouter.get("/user/feed", async (req, res) => {
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

userRouter.delete("/user", async (req, res) => {
    const userId = req.body._id
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");  
    } catch (err) {
        res.status(500).send("Something went wrong, whene deleting user", err.message)
    }
    
})

module.exports = userRouter;