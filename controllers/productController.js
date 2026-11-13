let Product = require("../models/productSchema");
const { readSheet } = require("read-excel-file/node");
const productBulkSchema = require("../utils/productBulkSchema");

const createProduct = async (req, res) => {
  try {
    let {
      title,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      subcategory,
      isMain,
      owner,
    } = req.body;

    if (
      !title ||
      !description ||
      !shortDescription ||
      !price ||
      !discountPrice ||
      !category ||
      !subcategory
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than zero",
      });
    }

    if (discountPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Discount price cannot be negative",
      });
    }

    let images = [];

    req.files.map((item, index) => {
      images.push({
        url: item.path,
        isMain: index == isMain ? true : false,
      });
    });

    let slug = title.toLowerCase().split(" ").join("-");

    let existingSlug = await Product.findOne({ slug: slug });

    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "Slug Exist",
      });
    }

    let sku = `product-${Date.now()}`;

    let existingSku = await Product.findOne({ sku: sku });

    if (existingSku) {
      return res.status(400).json({
        success: false,
        message: "SKU Exist",
      });
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
      owner: owner,
    }).save();

    res.status(201).json({
      success: true,
      message: "Product Created",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    let product = await Product.find({}).populate([
      "category",
      "subcategory",
      "owner",
    ]);

    res.status(200).json({
      success: true,
      message: "All Product",
      count: product.length,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCategoryWiseProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Product.find({ category: id });

    res.status(200).json({
      success: true,
      message: "All Category Wise Product",
      count: product.length,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllSubCategoryWiseProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Product.find({ subcategory: id });

    res.status(200).json({
      success: true,
      message: "All SubCategory Wise Product",
      count: product.length,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOwnerWiseProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Product.find({ owner: id });

    res.status(200).json({
      success: true,
      message: "All Owner Wise Product",
      count: product.length,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted",
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const bulkProductUpload = async (req, res) => {
  try {
    const { objects, errors } = await readSheet(req.file.path, {
      productBulkSchema,
    });

    if (errors) {
      return res.status(400).json({
        success: false,
        message: "Invalid spreadsheet data",
        errors: errors,
      });
    }

    const products = objects.map((product) => {
      return {
        ...product,
        slug: product.slug
          ? product.slug
          : product.title.toLowerCase().split(" ").join("-"),
        sku: product.sku
          ? product.sku
          : `eco-${product.title.substring(0, 4)}-${Date.now()}`,
        images: [
          {
            url: product.images,
            isMain: false,
          },
        ],
      };
    });

    console.log(products);

    await Product.insertMany(products);

    return res.status(201).json({
      success: true,
      message: "Products imported successfully",
    });
  } catch (error) {
    console.error("Bulk Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Bulk upload failed",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let { id } = req.params;

    if (req.body.sku || req.body.slug) {
      return res.status(400).json({
        success: false,
        message: "Product SKU and URL slug cannot be modified once created.",
      });
    }

    let existingProduct = await Product.findOne({ _id: id });

    const images = [...existingProduct.images];
    req.files.map((item) => {
      images.push({
        url: item.path,
        isMain: false,
      });
    });

    existingProduct.images = images;

    if (req.body.isMain) {
      existingProduct.images.map((item, index) => {
        item.isMain = false;
      });
      existingProduct.images[req.body.isMain].isMain = true;
    }

    if (req.body.deleteImage) {
      if (existingProduct.images[req.body.deleteImage].isMain == true) {
        existingProduct.images[0].isMain = true;
      }
      existingProduct.images.splice(req.body.deleteImage, 1);
    }

    existingProduct.save();

    let data = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Product Updated",
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getAllCategoryWiseProduct,
  getAllSubCategoryWiseProduct,
  getAllOwnerWiseProduct,
  deleteProduct,
  bulkProductUpload,
  updateProduct,
};
