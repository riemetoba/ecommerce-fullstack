const express = require("express");
const _ = express.Router();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



_.post("/registration", (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;

  //  fields validation
  if (!fullName || !email || !password || !confirmPassword || !terms) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // email validation
  if (!emailRegex.test(email)) {
     return res.status(400).json({
      success: false,
      message: "Please enter a valid Email",
    });
  }
  // password validation
  if (!emailRegex.test(email)) {
     return res.status(400).json({
      success: false,
      message: "Please enter a valid Email",
    });
  }

  //   password, confirmPassword validation
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password do not match",
    });
  }

  
});

module.exports = _;
