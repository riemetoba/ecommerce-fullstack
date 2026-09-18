const express = require("express");
const { userController, updateController, createCategoryController } = require("../controllers/userController");
const _ = express.Router();





_.get("/products", userController)
_.post("/update/profile/:id", updateController)
_.post("/create/category", createCategoryController)


module.exports = _;