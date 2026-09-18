const User = require('../models/userSchema')

let allUserController = async (req, res) => {
    try {
        let users = await User.find({}).select('-password')

        res.status(200).json({
            success: true,
            message: `${users.length} user found`,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let deleteUserController = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let singleUserController = async(req, res) => {
    try {
        let {id} = req.params
        let data = await User.findOne({_id: id}).select('-password')

        res.status(200).json({
            success: true,
            message: `User info`,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let activeUserController = async(req, res) => {
    try {
        let data = await User.find({status: 'active'})

        res.status(200).json({
            success: true,
            message: `Active User info`,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let deactiveUserController = async(req, res) => {
    try {
        let data = await User.find({status: 'deactive'})

        res.status(200).json({
            success: true,
            message: `Deactive User info`,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let updateUserController = async(req, res) => {
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

module.exports = {allUserController, deleteUserController, singleUserController, activeUserController, deactiveUserController, updateUserController}