const User = require('../models/userSchema')
const Category = require('../models/categorySchema')

let userController = (req, res) => {
    try {
        res.send("Hello user");
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
        await User.findByIdAndUpdate({_id: id}, req.body, {new: true})

        res.status(200).json({
            success: true,
            message: `User Updated`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let createCategoryController = async (req, res) => {
    try {
        let {name} = req.body
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

module.exports = {userController, updateController, createCategoryController, getAllCategoryController}