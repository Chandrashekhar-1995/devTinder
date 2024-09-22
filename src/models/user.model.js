const mongoose = require("mongoose");
const validator = require('validator');

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
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address: "+ value)
                }
            }

        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Please Inter a strong password: "+ value)
                }
            }
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
            default: "https://www.pngwing.com/en/free-png-zlrqq",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid Photo url: "+ value)
                }
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);