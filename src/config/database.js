const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://chandra:Shekhar%40123@devtinder.ed25r.mongodb.net/devTinder");
};



module.exports = connectDB;