const express = require("express");

const app = express();


app.use("/user", (req, res, next) => {
    console.log("1st response");
        next();
    // res.send("1st response");
},
    (req, res, next) => {
        console.log("Second response");
        next();
        // res.send("Second response");
        
    }, 
    [(req, res, next) => {
        console.log("3rd response");
        next();
        // res.send("3rd response");
        
    }, 
    (req, res, next) => {
        console.log("4th response");
        next();
        res.send("4th response");
        
    }], 
    (req, res, next) => {
        console.log("5th response");
        // res.send("5th response");
        // next();
        
    }, 
)

app.listen(7777, () => {
    console.log("Server is running successfull on port 7777");
});