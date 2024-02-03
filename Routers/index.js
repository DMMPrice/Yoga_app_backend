// Importing the Express module
const express = require("express");

// Creating a router instance using Express
const router = express.Router();

// Importing the authentication route module
const authRoute = require("./auth");
const profile_route = require("./profile");

// Using the authentication route under the "/auth" path
router.use("/auth", authRoute);
router.use("/profile", profile_route);

// Exporting the router for use in other parts of the application
module.exports = router;
