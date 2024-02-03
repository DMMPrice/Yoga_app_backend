// Importing necessary modules and functions
const asyncErrorWrapper = require("express-async-handler");
const userProfile = require("../models/user.profile.model");
const User = require("../models/user.data.model");

// Profile creation endpoint
const create = asyncErrorWrapper(async (req, res) => {
    // Extracting user input from request body
    const {userID, age, height, weight} = req.body;

    // Creating a new user profile
    const newUserProfile = new userProfile({
        userID, age, height, weight
    });
    const existingUser = await User.findById(userID);
    if (existingUser === null) {
        console.log("User Data not found. Create the account first.");
        return res.status(404).json("User Data not found. Create the account first.");
    } else {
        try {
            // Saving the created user profile
            await newUserProfile.save();
            // Sending a successful response with the created user
            console.log("User Profile Created");
            res.status(201).json(newUserProfile);
        } catch (error) {
            // Handling errors and sending an internal server error response
            console.error(error);
            res.status(500).json("Internal Server Error");
        }
    }
});

const get = asyncErrorWrapper(async (req, res) => {
    const {userID} = req.body;
    try {
        const profile = await userProfile.findOne({userID: userID});
        if (!profile) {
            console.log("User profile not found");
            return res.status(404).json("User profile not found");
        }
        console.log("User profile found");
        return res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

const update = asyncErrorWrapper(async (req, res) => {
    const {userID, age, height, weight, transformation, targetWeight, targetDay} = req.body;
    const existingUserProfile = await userProfile.findOne({userID: userID});
    if (existingUserProfile === null) {
        console.log("User Profile not found. Create the profile first.");
        return res.status(404).json("User Profile not found. Create the profile first.");
    } else {
        try {
            const updatedUserProfile = await userProfile.findByIdAndUpdate(existingUserProfile._id, {
                userID, age, height, weight, transformation, targetWeight, targetDay
            }, {new: true});
            console.log("User Profile Updated");
            res.status(201).json(updatedUserProfile);
        } catch (error) {
            console.error(error);
            res.status(500).json("Internal Server Error");
        }
    }
});


// Exporting the registration and login functions
module.exports = {
    create, get, update
};