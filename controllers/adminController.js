const User = require('../models/userSchema')


let allUserController = async (req, res)=>{

   let users = await User.find({}).select('-password')

    res.status(200).json({
        success: true,
        message: `${users.length} user found`,
        data: users
    })
    
}
// ==================================

let deleteUserController = async (req, res) => {
    let {id} = req.params

    let deletedUser = await User.findByIdAndDelete(id)

    if(!deletedUser){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "user deleted successfully"
    })
}
// ====================================

let singleUserController = async(req, res)=>{
    let {id} = req.param
    let data = await User.findOne({_id: id}).select('-password')

    res.status(200).json({
        success: true,
        message: `User info`,
        data: data
    })
}
// ==============================

let activeUserController = async(req, res)=>{
    let data = await User.find({status: 'active'})

    res.status(200).json({
        success: true,
        message: `Active User info`,
        data: data
    })
}
// ===================================

let deactiveUserController = async(req, res)=>{
    let data = await User.find({status: 'deactive'})

    res.status(200).json({
        success: true,
        message: `Deactive User info`,
        data: data
    })
}
// ==========================================

let updateUserController = async(req, res)=>{
    let {id} = req.params
    await User.findByIdAndUpdate({_id: id}, req.body, {new: true})

    res.status(200).json({
        success: true,
        message: `User Updated`
    })
}


module.exports = {allUserController, deleteUserController, singleUserController, activeUserController, deactiveUserController, updateUserController}