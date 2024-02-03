// Importing necessary modules and functions
const asyncErrorWrapper = require("express-async-handler");
const {comparePassword} = require("../Helpers/input/inputHelpers");
const User = require("../models/user.data.model");

// Registration endpoint
const register = asyncErrorWrapper(async (req, res) => {
    // Extracting user input from request body
    const {fullName, email, password} = req.body;
    try {
        // Checking if a user with the same email already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            console.log("Same ID");
            return res.status(400).json("Same ID");
        }

        // Creating a new user
        const newUser = await User.create({
            fullName,
            email,
            password
        });

        // Sending a successful response with the created user
        console.log("User Created");
        res.status(201).json(newUser);
    } catch (error) {
        // Handling errors and sending an internal server error response
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Login endpoint
const login = asyncErrorWrapper(async (req, res) => {
    // Extracting user input from request body
    const {email, password} = req.body;
    try {
        // Finding the user by email and including the password in the query
        const user = await User.findOne({email}).select("+password");

        // Handling cases where the user is not found
        if (!user) {
            console.log("Not Found");
            res.status(400).send("Not Found");
        }

        // Comparing the provided password with the stored password
        if (!comparePassword(password, user.password)) {
            console.log("Wrong Password");
            res.status(404).send("Wrong Password");
        }

        // Sending a successful response with the found user
        console.log("User Found");
        res.status(201).json(user);
    } catch (error) {
        // Handling errors and sending an internal server error response
        console.error(error);
        res.status(404).send("Internal Server Error");
    }
});

// Exporting the registration and login functions
module.exports = {
    register,
    login
};
