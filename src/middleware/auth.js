const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Invalid token !!! please login again");
        }

        const decodedObj = await jwt.verify(token, "MybestFriend123123@");
        const { _id } = decodedObj;

        const user = await User.findById(_id)

        if (!user) {
            throw new Error("User not found !! please login again");
        }

        req.user = user;
        next();
        
    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
};

module.exports = userAuth;
