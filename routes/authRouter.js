const express = require("express");
const _ = express.Router();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



_.post("/registration", (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;

  // All fields validation
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
  if (!passwordRegex.test(password)) {
     return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character",
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
