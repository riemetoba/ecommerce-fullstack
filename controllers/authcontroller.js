const User = require('../models/userSchema')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verificationEmail } = require('../utils/transporter');
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const registrationController = async (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;

// finding User in database
  const existingUser = await User.findOne({email})

  // existingUser validation
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

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
  // if (!passwordRegex.test(password)) {
  //    return res.status(400).json({
  //     success: false,
  //     message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character",
  //   });
  // }

  //   password, confirmPassword validation
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password do not match",
    });
  }

  // password hashing
  const hash = bcrypt.hashSync(password, 10);

  // save in database
  const user = new User({
    fullName: fullName,
    email: email, 
    password: hash,
    terms: terms
  })
  user.save()

  // JWT token verify 
  const verificationToken = jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role
  }, 'itsSecret', {expiresIn: '3d'})

  verificationEmail(email, verificationToken)
  

  return res.status(201).json({
    success: true,
    message: "Registration Successful"
  })
}

module.exports = registrationController
