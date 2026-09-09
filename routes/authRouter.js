const express = require("express");
const _ = express.Router();

_.post("/registration", (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;
  if (!fullName || !email || !password || !confirmPassword || !terms) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  // res.json('regitration done')
});

module.exports = _;
