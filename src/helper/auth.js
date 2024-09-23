const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Please enter a valid name")
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid Email :- " + email)
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a Strong password :- " + password)
    }
};

module.exports = { validateSignupData };