// Importing the Express module
const express = require("express");

// Importing the registration and login functions from the auth controller
const { create } = require("../Controllers/profile");

// Creating a router instance using Express
const router = express.Router();

// Defining a route for user registration using the register function
router.post("/create", create);


// Exporting the router for use in other parts of the application
module.exports = router;
