let Product = required("../models/productSchema.js")

const createProduct = async (req, res) => {
    let {title, description, shortDescription, price, brand, discountPrice, category, subcategory} = req.body

    if (!title || !description || !shortDescription || !price || !brand || !discountPrice || !category || !subcategory) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }
    let slug = title.toLowerCase().split('').join('-');
   let existingSlug = await Product.findOne({slug})

}


module.exports = {createProduct}