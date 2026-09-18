const Category = require('../models/categorySchema')

let userController = (req, res)=>{
    res.send("Hello user");
    
}

let updateController = async(req, res)=>{
    let {id} = req.params
    await User.findByIdAndUpdate({_id: id}, req.body, {new: true})

    res.status(200).json({
        success: true,
        message: `User Updated`
    })
}


let createCategoryController = async(req, res)=>{
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
    category.save()

    res.status(201).json({
        success: true,
        message: "Category created"
    })
}


let getAllCategoryController = async(req, res)=>{
    let allCategory = await Category.find({})

     res.status(200).json({
        success: true,
        message: "All Category",
        data: allCategory
    })
  
}



module.exports = {userController, updateController, createCategoryController, getAllCategoryController}