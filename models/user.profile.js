// Importing the Schema and model from the mongoose module
const { Schema, model } = require('mongoose');

// Defining the schema for users using mongoose Schema
const userSchema = new Schema({
    // Full name of the user
    userID: {
        type: Schema.ObjectId,
        ref: "User", // Referencing the "User" model
        required: true
    },
    age: {
        type: Number,
        required: [true, "Please give your age"],
        default: 18
    },
    height: {
        type: Number,
        required: [true, "Please provide your height"],
        default: 160
    },weight: {
        type: Number,
        required: [true, "Please provide your weight"],
        default: 60
    },
}, { timestamps: true }); // Adding timestamps to track creation and update times

// Creating a User model using the userSchema
const User = model("Profile", userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
