const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");
const requestRouter = require("./routes/requestRouter");


app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", userRouter)
app.use("/", requestRouter)


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
