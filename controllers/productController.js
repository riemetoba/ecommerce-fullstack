let Product = require("../models/productSchema")

const createProduct = async (req, res) => {
    let {title, description, shortDescription, price, discountPrice, category, subcategory} = req.body

    if (!title || !description || !shortDescription || !price || !discountPrice || !category || !subcategory) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        })
    }
    let slug = title.toLowerCase().split('').join('-');
   let existingSlug = await Product.findOne({slug: slug})
   
   if (existingSlug) {
     return res.status(400).json({
            success: false,
            message: "Slug Exist"
        })
   }

   let sku = `product-${Date.now()}`
   let existingSku = await Product.findOne({sku})
      if (existingSku) {
     return res.status(400).json({
            success: false,
            message: "SKU Exist"
        })
   }
   
   let product = new Product({
      title, 
      description, 
      shortDescription, 
      price, 
      discountPrice, 
      category, 
      subcategory
   })
   product.save()

    res.status(201).json({
            success: true,
            message: "Product Created",
            product: product,
            slug: slug,
            sku: sku
        })
}


module.exports = {createProduct}