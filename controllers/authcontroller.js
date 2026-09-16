const User = require("../models/userSchema");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verificationEmail, forgotPasswordEmail } = require("../utils/transporter");
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Registration controller start
const registrationController = async (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ email });

  // Return error if user already exists
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  // Validate that all required fields are provided
  if (!fullName || !email || !password || !confirmPassword || !terms) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // Validate email format using regex
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid Email",
    });
  }

  // Validate password strength using regex (Currently disabled)
  // if (!passwordRegex.test(password)) {
  //    return res.status(400).json({
  //     success: false,
  //     message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character",
  //   });
  // }

  // Verify that password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password do not match",
    });
  }

  // Hash the password for secure storage
  const hash = bcrypt.hashSync(password, 10);

  // Create a new user instance and save it to the database
  const user = new User({
    fullName: fullName,
    email: email,
    password: hash,
    terms: terms,
  });
  user.save();

  // Generate JWT verification token for the new user
  const verificationToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "20d" },
  );

  // Send verification email to the user
  verificationEmail(email, verificationToken);

  return res.status(201).json({
    success: true,
    message: "Registration Successful",
  });
};
// Registration controller end

// Login controller start
const loginController = async (req, res) => {
  // Extract email and password from request body
  let { email, password } = req.body;

  // Find user in the database by email
  const existingUser = await User.findOne({ email });

  // Return error if user does not exist
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "Invaild Credential",
    });
  }

  // Validate that all required fields are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // Validate email format using regex
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid Email",
    });
  }

  // Compare input password with hashed password stored in database
  let comparePassword = bcrypt.compareSync(password, existingUser.password);

  // Handle successful login or incorrect password response
  if (comparePassword) {
 const accessToken = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "20d" },
  )
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
      accessToken: accessToken
      
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invaild Credential",
    });
  }
};
// Login controller end

// verification controller start
const verifyEmailController = async (req, res) => {
  // Extract verification token from request parameters
  let { token } = req.params;

  // Verify and decode the JWT verification token
  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  // Update user verification status in the database
  await User.findByIdAndUpdate(
    { _id: decoded._id },
    { isverified: true },
  );

  // Return success response
  res.status(200).json({
    success: true,
    message: "Email verified successfully!",
  });
};

// verification controller end

// forgot password controller start
const forgotPasswordController = async (req, res) => {
  let {email} = req.body

  const existingUser = await User.find({email})

  if(!existingUser){
     return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const resetPasswordToken = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "20d" },
  )
  forgotPasswordEmail(email, resetPasswordToken)

  return res.status(400).json({
      success: true,
      message: "Check your Email for reseting password",
    });
}
// forgot password controller end

// reset password controller start
const resetPasswordController = async (req, res) => {
  let {token} = req.params
  let {newPassword, confirmPassword} = req.body

 let {_id} = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

 
 if (_id) {
  if (newPassword == confirmPassword) {
     const hash = bcrypt.hashSync(newPassword, 10);
    await User.findByIdAndUpdate(_id, {password: hash})
    return res.status(200).json({
       success: true,
      message: "Password reset done"
    })
  }else{
    return res.status(400).json({
       success: false,
      message: "Password not match"
    })
  }
 }
   
}
// reset password controller end

module.exports = {
  registrationController,
  loginController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController
};


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3ODk0OTAwNDgsImV4cCI6MTc5MTIxODA0OH0.K7IEzIakV2WbD8d9nDiVGOKcEmTmUvj_IutUnLkx2Zk
