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
const { createProduct, getAllProduct, deleteProduct, getAllCategoryWiseProduct, getAllSubCategoryWiseProduct, getAllOwnerWiseProduct } = require("../controllers/productController");
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
router.post("/create/product", upload.array('image', 5), createProduct);

router.get('/all/products', getAllProduct)

router.delete('/product/delete/:id', deleteProduct);

router.get('/product/category/:id' , getAllCategoryWiseProduct)

router.get('/product/subcategory/:id' , getAllSubCategoryWiseProduct)

router.get('/product/owner/:id', getAllOwnerWiseProduct)

module.exports = _;