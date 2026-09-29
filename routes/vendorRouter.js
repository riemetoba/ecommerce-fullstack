const express = require("express");
const { 
    createCategory, 
    getAllCategory, 
    updateCategory, 
    deleteCategory 
} = require("../controllers/vendorController");
const _ = express.Router();




_.post("/create/category", createCategory)

_.get("/all/category", getAllCategory)

_.post("/update/category/:id", updateCategory)

_.delete("/delete/category/:id", deleteCategory)

module.exports = _;