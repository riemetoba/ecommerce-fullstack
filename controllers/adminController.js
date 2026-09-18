const User = require('../models/userSchema')


let allUserController = async (req, res)=>{

   let users = await User.find({}).select('-password')

    res.status(200).json({
        success: true,
        message: `${users.length} user found`,
        data: users
    })
    
}


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


module.exports = {allUserController, deleteUserController}