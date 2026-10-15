const Category = require("../models/categorySchema");
const SubCategory = require("../models/subCategorySchema");


const getCategoryWithSubCategory = (data) => {
  return new Promise((resolve, reject) => {
    let category = [];
    data.map(async (item) => {
      let subCat = await SubCategory.find({ parentCategory: item._id });
      category.push({
        ...item,
        subCategory: subCat,
      });
      if (data.length == category.length) {
        resolve(category);
      }
    });
  });
};

module.exports = getCategoryWithSubCategory;