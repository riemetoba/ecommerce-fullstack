let Product = require("../models/productSchema")

const createProduct = async (req, res) => {
    try {
        let {title, description, shortDescription, price, discountPrice, category, subcategory, isMain, owner} = req.body

        if (!title || !description || !shortDescription || !price || !discountPrice || !category || !subcategory) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        if (price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than zero"
            })
        }

        if (discountPrice < 0) {
            return res.status(400).json({
                success: false,
                message: "Discount price cannot be negative"
            })
        }

        let images = []

        req.files.map((item, index) => {
            images.push({
                url: item.path,
                isMain: index == isMain ? true : false
            })
        })

        let slug = title.toLowerCase().split(' ').join('-')

        let existingSlug = await Product.findOne({slug: slug})

        if (existingSlug) {
            return res.status(400).json({
                success: false,
                message: "Slug Exist"
            })
        }

        let sku = `product-${Date.now()}`

        let existingSku = await Product.findOne({sku: sku})

        if (existingSku) {
            return res.status(400).json({
                success: false,
                message: "SKU Exist"
            })
        }

        let product = await new Product({
            title: title,
            description: description,
            shortDescription: shortDescription,
            price: price,
            discountPrice: discountPrice,
            category: category,
            subcategory: subcategory,
            slug: slug,
            sku: sku,
            images: images,
            owner: owner
        }).save()

        res.status(201).json({
            success: true,
            message: "Product Created",
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getAllProduct = async (req, res) => {
    try {
        let product = await Product.find({}).populate(["category", "subcategory", "owner"])

        res.status(200).json({
            success: true,
            message: "All Product",
            count: product.length,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getAllCategoryWiseProduct = async (req, res) => {
    try {
        let {id} = req.params

        let product = await Product.find({category: id})

        res.status(200).json({
            success: true,
            message: "All Category Wise Product",
            count: product.length,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getAllSubCategoryWiseProduct = async (req, res) => {
    try {
        let {id} = req.params

        let product = await Product.find({subcategory: id})

        res.status(200).json({
            success: true,
            message: "All SubCategory Wise Product",
            count: product.length,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getAllOwnerWiseProduct = async (req, res) => {
    try {
        let {id} = req.params

        let product = await Product.find({owner: id})

        res.status(200).json({
            success: true,
            message: "All Owner Wise Product",
            count: product.length,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const deleteProduct = async (req, res) => {
    try {
        let {id} = req.params

        let product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted",
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = {createProduct, getAllProduct, getAllCategoryWiseProduct, getAllSubCategoryWiseProduct, getAllOwnerWiseProduct, deleteProduct}