// Importing necessary modules and functions
const asyncErrorWrapper = require("express-async-handler");
const Profile = require("../models/user.profile.model");

// Profile creation endpoint
const create = asyncErrorWrapper(async (req, res) => {
    // Extracting user input from request body
    const {userID, age, height, weight} = req.body;
    try {
        // Creating a new user profile
        const newUser = await Profile.create({
            userID, age, height, weight
        });

        // Sending a successful response with the created user
        console.log("User Profile Created");
        res.status(201).json(newUser);
    } catch (error) {
        // Handling errors and sending an internal server error response
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

// Exporting the registration and login functions
module.exports = {
    create,
};