const express = require("express");
const { userController } = require("../controllers/userController");
const _ = express.Router();





_.get("/products", userController)

module.exports = _;