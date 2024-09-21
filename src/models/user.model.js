const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true,
            minLength: 3,
            maxLength: 40,
            trim: true
        },
        lastName: {
            type: String,
            lowercase: true,
            minLength: 3,
            maxLength: 40,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minLength: 10,
            maxLength: 80,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!["male", "female", "others"].includes(value)) {
                    throw new Error("Gender data is not valid")
                }
            },
        },
        skills: [],
        about: {
            type: String,
            default: "This is default about value"
        },
        photoUrl: {
            type: String,
            default: "https://www.pngwing.com/en/free-png-zlrqq"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);