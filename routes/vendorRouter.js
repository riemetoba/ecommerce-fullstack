const express = require("express");
const { 
    createCategory, 
    getAllCategory, 
    updateCategory, 
    deleteCategory, 
    createSubCategory,
    getAllSubCategory,
    getAllCategoryWiseSubCategory
} = require("../controllers/vendorController");
const _ = express.Router();




_.post("/create/category", createCategory) 

_.post("/create/subcategory", createSubCategory)

_.get("/all/category", getAllCategory)

_.get("/all/subcategory", getAllSubCategory)

_.get("/all/category/:id/subcategory", getAllCategoryWiseSubCategory)

_.post("/update/category/:id", updateCategory)

_.delete("/delete/category/:id", deleteCategory)

module.exports = _;