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



module.exports = {userController, updateController}