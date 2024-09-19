const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.use("/admin/getAllData", adminAuth, (req, res) => {
    
    res.send("All data send")
});

app.get("/user/login", (req, res) => {
    
    res.send("User login successfull")
});


app.get("/user/getAllData", userAuth, (req, res) => {
    
    res.send("User releted all data send")
});

app.listen(7777, () => {
    console.log("Server is running successfull on port 7777");
});  