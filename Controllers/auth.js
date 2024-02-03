// Importing necessary modules and functions
const asyncErrorWrapper = require("express-async-handler");
const {comparePassword} = require("../Helpers/input/inputHelpers");
const User = require("../models/user.data.model");

// Registration endpoint
const register = asyncErrorWrapper(async (req, res) => {
    // Extracting user input from request body
    const {fullName, email, password} = req.body;
    let existingUser;
    try {
        // Checking if a user with the same email already exists
        existingUser = await User.findOne({email: email});
    } catch (error) {
        // Handling errors and sending an internal server error response
        console.log(error);
        return (res.status(400).json('Logging in failed, please try again later.'));

    }
    if (existingUser) {
        console.log("Same ID");
        return (res.status(400).json("Same ID"));
    }

    // Creating a new user
    const newUser = new User({
        fullName,
        email,
        password
    });
    try {
        // Saving the created user to the database
        // Sending a successful response with the created user
        console.log("User Created");
        await newUser.save();
    } catch (error) {
        // Handling errors and sending an internal server error response
        console.error(error);
        return (res.status(404).json('Logging in failed, please try again later.'));
    }
});

// Login endpoint
const login = asyncErrorWrapper(async (req, res) => {
    // Extracting user input from request body
    const {email, password} = req.body;
    try {
        // Finding the user by email and including the password in the query
        const user = await User.findOne({email}).select("+password");
        // Comparing the provided password with the stored password
        if (comparePassword(password, user.password) === 'False') {
            console.log("Wrong Password");
            return res.status(404).json("Wrong Password");
        }
        // Handling cases where the user is not found
        if (!user) {
            console.log("Not Found");
            return res.status(400).json("Not Found");
        }


        // Sending a successful response with the found user
        console.log("User Found");
        return res.status(201).json(user);
    } catch (error) {
        // Handling errors and sending an internal server error response
        console.error(error);
        return res.status(404).json("Internal Server Error");
    }
});

// Exporting the registration and login functions
module.exports = {
    register,
    login
};
