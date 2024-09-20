const express = require("express");
const connectDB = require("./config/database");
const app = express();



connectDB()
    .then(() => {
        console.log("Data base connection successfully stablished");
        app.listen(7777, () => {
            console.log("Server is running successfull on port 7777");
        });  
    })
    .catch((err) => {
        console.error("Database cannot be connected !!", err);
    
    });

