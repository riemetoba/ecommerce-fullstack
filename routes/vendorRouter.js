const express = require("express");
const { 
    createCategoryController, 
    getAllCategoryController, 
    updateCategoryController, 
    deleteCategoryController 
} = require("../controllers/vendorController");
const _ = express.Router();




_.post("/create/category", createCategoryController)

_.get("/all/category", getAllCategoryController)

_.post("/update/category/:id", updateCategoryController)

_.delete("/delete/category/:id", deleteCategoryController)

module.exports = _;