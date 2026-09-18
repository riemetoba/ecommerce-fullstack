const User = require('../models/userSchema')


let allUserController = async (req, res)=>{

   let users = await User.find({})

    res.status(200).json({
        success: true,
        message: `${users.length} user found`,
        data: users
    })
    
}



module.exports = {allUserController}