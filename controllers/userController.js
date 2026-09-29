const User = require('../models/userSchema')

let userController = (req, res) => {
    try {
        res.send("Hello user")
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

let updateController = async (req, res) => {
    try {
        let {id} = req.params

        if (req.user._id == id || req.user.role == 'admin') {
            await User.findByIdAndUpdate({_id: id}, req.body, {new: true})

            return res.status(200).json({
                success: true,
                message: `User Updated`
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    userController, 
    updateController
}