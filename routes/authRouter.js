const express = require("express");
const {registrationController, loginController, verifyEmailController} = require("../controllers/authcontroller");
const _ = express.Router();




_.post("/registration", registrationController)
_.post("/login", loginController)
_.post("/verify/:token", verifyEmailController)

module.exports = _;
