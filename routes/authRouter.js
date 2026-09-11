const express = require("express");
const {registrationController, loginController} = require("../controllers/authcontroller");
const _ = express.Router();




_.post("/registration", registrationController)
_.post("/login", loginController)

module.exports = _;
