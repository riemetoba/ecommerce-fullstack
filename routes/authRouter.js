const express = require("express");
const {registrationController, loginController, verifyEmailController, forgotPasswordController} = require("../controllers/authcontroller");
const _ = express.Router();




_.post("/registration", registrationController)
_.post("/login", loginController)
_.post("/verify/:token", verifyEmailController)
_.post("/forgot-password", forgotPasswordController)

module.exports = _;
