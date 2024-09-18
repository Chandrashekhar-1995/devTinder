const express = require("express");

const app = express();


app.get("/user", (req, res) => {
    res.send({
        "First Name": "Chandra",
        "Last name": "Shekhar"
    })
});


app.post("/user", (req, res) => {
    //after send user data 
    res.send("Post call successfull")
});


app.patch("/user", (req, res) => {
    //after update user data 
    res.send("User update successfully by patch")
});

app.delete("/user", (req, res) => {
    //after delete user 
    res.send("User deleted successfully")
})


app.use("/", (req, res) => {
    res.send("Namaste chandra")
})

app.listen(7777, () => {
    console.log("Server is running successfull on port 7777");
});