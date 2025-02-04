const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const userRouter = require("./routes/userRoutes");
const requestRouter = require("./routes/requestRoutes");


app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
  }));
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


