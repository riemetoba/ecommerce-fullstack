const express = require("express");
const { userController, updateController } = require("../controllers/userController");
const _ = express.Router();





_.get("/products", userController)
_.post("/update/profile/:id", updateController)

module.exports = _;