const User = require('../models/userSchema')
const Category = require('../models/categorySchema')
const { categoryCreationEmail } = require('../utils/transporter')

let userController = (req, res) => {
    try {
        res.send("Hello user")
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let updateController = async (req, res) => {
    try {
        let {id} = req.params

        if (req.user._id == id || req.user.role == 'admin') {
            await User.findByIdAndUpdate({_id: id}, req.body, {new: true})

            return res.status(200).json({
                success: true,
                message: `User Updated`
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let createCategoryController = async (req, res) => {
    try {
        let {name, email} = req.body
        let existingName = await Category.findOne({name: name.toLowerCase()})

        if (existingName) {
            return res.status(400).json({
                success: false,
                message: "Category already Exist"
            })
        }

        let category = new Category({
            name: name.toLowerCase()
        })
        await category.save()

        await categoryCreationEmail(email, category.name)

        res.status(201).json({
            success: true,
            message: "Category created"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let getAllCategoryController = async (req, res) => {
    try {
        let allCategory = await Category.find({})

        res.status(200).json({
            success: true,
            message: "All Category",
            data: allCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let updateCategoryController = async (req, res) => {
    try {
        let {id} = req.params
        let {name} = req.body
        
        await Category.findByIdAndUpdate({_id: id}, {name: name.toLowerCase()}, {new: true})

        res.status(200).json({
            success: true,
            message: `Category Updated`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let deleteCategoryController = async (req, res) => {
    try {
        let {id} = req.params
        await Category.findByIdAndDelete({_id: id})

        res.status(200).json({
            success: true,
            message: "Category Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    userController, 
    updateController, 
    createCategoryController, 
    getAllCategoryController, 
    updateCategoryController, 
    deleteCategoryController
}