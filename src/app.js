const express = require("express");

const app = express();


app.get("/getUserData", (req, res) => {
    try {
            // logic to db call and get user data
    throw new err("SDFGHF");

    res.send("User data send")
    } catch (err) {
        res.status(501).send("Some error occured please contact support ")
    }

});





app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(501).send("Something went wrong")
    }
});


app.listen(7777, () => {
    console.log("Server is running successfull on port 7777");
});  