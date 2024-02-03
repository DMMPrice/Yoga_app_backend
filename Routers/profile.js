// Importing the Express module
const express = require("express");

// Importing the registration and login functions from the auth controller
const {create, get, update} = require("../Controllers/profile");

// Creating a router instance using Express
const router = express.Router();

// Defining a route for user registration using the register function
router.post("/create", create);
router.post("/update", update);
router.get("/get", get);


// Exporting the router for use in other parts of the application
module.exports = router;
