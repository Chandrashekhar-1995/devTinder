const express = require("express");

const app = express();


app.use("/dashboard", (req, res) => {
    res.send("Welcome to dashboard")
});


app.use("/test", (req, res) => {
    res.send("This is our test page")
});


app.use("/hello", (req, res) => {
    res.send("Hello hello hello")
});

app.listen(7777, () => {
    console.log("Server is running successfull on port 7777");
});