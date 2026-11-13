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

const upload = require("../utils/storage");
const { createProduct, getAllProduct, deleteProduct, getAllCategoryWiseProduct, getAllSubCategoryWiseProduct, getAllOwnerWiseProduct, updateProduct, bulkProductUpload } = require("../controllers/productController");
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



// product
_.post("/create/product", upload.array('image'), createProduct);

_.get('/all/products', getAllProduct)

_.delete('/product/delete/:id', deleteProduct);

_.get('/product/category/:id' , getAllCategoryWiseProduct)

_.get('/product/subcategory/:id' , getAllSubCategoryWiseProduct)

_.get('/product/owner/:id', getAllOwnerWiseProduct)

_.post('/bulk/product',upload.single('file') ,bulkProductUpload)

_.post('/single/product/upload/:id',upload.array('image') ,updateProduct)

module.exports = _;