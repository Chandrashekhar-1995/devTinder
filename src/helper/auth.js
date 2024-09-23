const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Please enter a valid name")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Please enter a valid Email :- " + emailId)
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a Strong password :- " + password)
    }
};

module.exports = { validateSignupData };