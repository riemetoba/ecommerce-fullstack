const express = require("express");
const { 
    createCategory, 
    createSubCategory
} = require("../controllers/vendorController");

const upload = require("../utils/storage");
const { createProduct, deleteProduct, getAllCategoryWiseProduct, getAllSubCategoryWiseProduct, getAllOwnerWiseProduct, updateProduct, bulkProductUpload, getSingleProduct } = require("../controllers/productController");
const _ = express.Router();





// category & subCategory 
_.post("/create/category", createCategory) 

_.post("/create/subcategory", createSubCategory)


// product
_.post("/create/product", upload.array('image'), createProduct);

_.delete('/product/delete/:id', deleteProduct);

_.get('/product/category/:id' , getAllCategoryWiseProduct)

_.get('/product/subcategory/:id' , getAllSubCategoryWiseProduct)

_.get('/product/owner/:id', getAllOwnerWiseProduct)

_.post('/bulk/product',upload.single('file') ,bulkProductUpload)

_.post('/single/product/upload/:id',upload.array('image') ,updateProduct)

_.get('/single/product/:slug', getSingleProduct)

module.exports = _;