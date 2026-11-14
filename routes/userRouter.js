const express = require("express");
const { 
    userController, 
    updateController
} = require("../controllers/userController");
const { getSingleProduct, getAllProduct } = require("../controllers/productController");
const { getAllCategory, getAllSubCategory, getAllCategoryWiseSubCategory, getAllOwnerWiseCategory } = require("../controllers/vendorController");
const { createCart, updateCartQuantity, getCart } = require("../controllers/cartController");
const { paymentController } = require("../controllers/paymentController");
const _ = express.Router();


_.get("/alluser", userController)
_.get('/allproducts', getAllProduct)
_.post("/update/profile/:id", updateController)
_.get("/single/product/:slug" , getSingleProduct)

_.get("/allcategories", getAllCategory)
_.get("/allsubcategories", getAllSubCategory)
_.get('/category/:id/subcategory', getAllCategoryWiseSubCategory)
_.get('/user/:id/category', getAllOwnerWiseCategory)


_.post('/create/cart' , createCart)
_.post('/cart/increaseDecrease' , updateCartQuantity)
_.get('/get/cart',getCart)

_.post('/payment' , paymentController)



module.exports = _;