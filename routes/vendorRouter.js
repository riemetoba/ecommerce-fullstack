const express = require("express");
const { 
    createCategory, 
    getAllCategory, 
    updateCategory, 
    deleteCategory, 
    createSubCategory,
    getAllSubCategory,
    getAllCategoryWiseSubCategory,
    getAllOwnerWiseCategory
} = require("../controllers/vendorController");
const { createProduct } = require("../controllers/productController");
const _ = express.Router();



// category & subCategory 
_.post("/create/category", createCategory) 

_.post("/create/subcategory", createSubCategory)

_.get("/all/category", getAllCategory)

_.get("/all/subcategory", getAllSubCategory)

_.get("/category/:id/subcategory", getAllCategoryWiseSubCategory)

_.get("/user/:id/category", getAllOwnerWiseCategory)

_.post("/update/category/:id", updateCategory)

_.delete("/delete/category/:id", deleteCategory)

// Product

_.post("/create/product", createProduct)

module.exports = _;