const User = require("../models/userSchema");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  verificationEmail,
  forgotPasswordEmail,
} = require("../utils/transporter");

// Registration controller start
const registrationController = async (req, res) => {
  try {
    let { fullName, email, password, confirmPassword, terms, role } = req.body;

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
    if (!fullName || !email || !password || !confirmPassword || !terms || !role) {
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
      role: role
    });
    
    // Using await to ensure user is saved before moving forward
    await user.save();

    // Generate JWT verification token for the new user
    const verificationToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_VERIFY_SECRET,
      { expiresIn: "20d" }
    );

    // Send verification email to the user
    verificationEmail(email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
    });

  } catch (error) {
    // Handle unexpected server errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
// Registration controller end


// Login controller start
const loginController = async (req, res) => {
  try {
    // Extract email and password from request body
    let { email, password } = req.body;

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

    // Find user in the database by email
    const existingUser = await User.findOne({ email });

    // Return error if user does not exist
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    // Compare input password with hashed password stored in database
    let comparePassword = bcrypt.compareSync(password, existingUser.password);

    // Handle successful login or incorrect password response
    if (comparePassword) {
      // Generate access token for logged-in user
      const accessToken = jwt.sign(
        {
          _id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
        },
        process.env.JWT_VERIFY_SECRET,
        { expiresIn: "20d" }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          _id: existingUser._id,
          fullName: existingUser.fullName,
          email: existingUser.email,
          role: existingUser.role,
        },
        accessToken: accessToken,
      });
    } else {
      // Return error if password does not match
      return res.status(400).json({
        success: false,
        message: "Invalid Credential",
      });
    }

  } catch (error) {
    // Handle unexpected server errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
// Login controller end


// verification controller start
const verifyEmailController = async (req, res) => {
  try {
    // Extract verification token from request parameters
    let { token } = req.params;

    // Verify and decode the JWT verification token
    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

    // Update user verification status in the database
    await User.findByIdAndUpdate(decoded._id, { isverified: true });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });

  } catch (error) {
    // Handle errors like expired or invalid token
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};
// verification controller end


// forgot password controller start
const forgotPasswordController = async (req, res) => {
  try {
    // Extract email from request body
    let { email } = req.body;

    // Check if the user exists in the database
    // Note: Use findOne instead of find to get a single object, not an array
    const existingUser = await User.findOne({ email });

    // Return error if user does not exist
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate token for resetting password
    const resetPasswordToken = jwt.sign(
      {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_VERIFY_SECRET,
      { expiresIn: "20d" }
    );

    // Send reset password email
    forgotPasswordEmail(email, resetPasswordToken);

    // Return success response indicating email has been sent
    return res.status(200).json({
      success: true,
      message: "Check your Email for resetting password",
    });

  } catch (error) {
    // Handle unexpected server errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};
// forgot password controller end


// reset password controller start
const resetPasswordController = async (req, res) => {
  try {
    // Extract token from parameters and passwords from body
    let { token } = req.params;
    let { newPassword, confirmPassword } = req.body;

    // Verify and decode the token
    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

    if (decoded) {
      // Check if new password and confirm password match
      if (newPassword === confirmPassword) {
        // Hash the new password
        const hash = bcrypt.hashSync(newPassword, 10);
        
        // Update user's password in the database
        await User.findByIdAndUpdate(decoded._id, { password: hash });

        // Return success response
        return res.status(200).json({
          success: true,
          message: "Password reset done",
        });
      } else {
        // Return error if passwords do not match
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }
    }
  } catch (error) {
    // Handle token errors or unexpected server errors
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message
    });
  }
};
// reset password controller end

module.exports = {
  registrationController,
  loginController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
};