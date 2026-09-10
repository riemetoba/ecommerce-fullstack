const express = require("express");
const registrationController = require("../controllers/authcontroller");
const _ = express.Router();




_.post("/registration", registrationController)

module.exports = _;
