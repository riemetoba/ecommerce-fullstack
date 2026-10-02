const Category = require('../models/categorySchema')
const SubCategory = require('../models/subCategorySchema')
const { categoryCreationEmail } = require('../utils/transporter')


let createCategory = async (req, res) => {
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

let getAllCategory = async (req, res) => {
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

let updateCategory = async (req, res) => {
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

let deleteCategory = async (req, res) => {
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

let createSubCategory = async (req, res) => {
    try {
        let {name, parentCategory} = req.body
        let existingName = await SubCategory.findOne({name: name.toLowerCase()})

        if (existingName) {
            return res.status(400).json({
                success: false,
                message: "SubCategory already Exist"
            })
        }

        let subCategory = new SubCategory({
            name: name.toLowerCase(),
            parentCategory: parentCategory
        })
        await subCategory.save()

        res.status(201).json({
            success: true,
            message: "SubCategory created"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let getAllSubCategory = async (req, res) => {
    try {
        let allSubCategory = await SubCategory.find({}).populate('parentCategory')

        res.status(200).json({
            success: true,
            message: "All Sub-Category",
            data: allSubCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let getAllCategoryWiseSubCategory = async (req, res) => {
    try {
        let {id} = req.params
        let allSubCategory = await SubCategory.find({parentCategory:id})

        res.status(200).json({
            success: true,
            message: "All Sub-Category",
            data: allSubCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createCategory, 
    getAllCategory, 
    updateCategory, 
    deleteCategory,
    createSubCategory,
    getAllSubCategory,
    getAllCategoryWiseSubCategory
}