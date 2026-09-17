const jwt = require("jsonwebtoken");


let adminMiddleware = (req, res, next)=>{
let authorizationToken = req.headers.authorization

let token = authorizationToken.split(" ")[1]

let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

if (decoded !== 'admin') {
    return res.status(401).json({
        success: false,
        message: "you're not authorized"
    })
}else{
    next
}

console.log(decoded);


}


module.exports = {adminMiddleware}