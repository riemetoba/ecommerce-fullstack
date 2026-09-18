const jwt = require("jsonwebtoken");

let adminMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    return res
      .status(401)
      .json({ success: false, message: "you're not loggedin" });
  }

  let token = authorizationToken.split(" ")[1];

  try {
    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
    console.log(decoded);
    

    if (decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "you're not authorized",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};

// ============================ 
let vendorMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    return res.status(401).json({
      success: false,
      message: "you're not loggedin",
    });
  }

  let token = authorizationToken.split(" ")[1];

  try {
    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

    if (decoded.role !== "admin" && decoded.role !== "vendor") {
      return res.status(401).json({
        success: false,
        message: "you're not authorized",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};

// =====================================
let userMiddleware = (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    return res.status(401).json({
      success: false,
      message: "you're not loggedin",
    });
  }

  let token = authorizationToken.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_VERIFY_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "you're not loggedin",
    });
  }
};

module.exports = { adminMiddleware, vendorMiddleware, userMiddleware };
