const express = require("express");
const { allUserController } = require("../controllers/adminController");
const _ = express.Router();





_.post("/all-user", allUserController)

module.exports = _;