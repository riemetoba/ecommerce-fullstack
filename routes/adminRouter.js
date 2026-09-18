const express = require("express");
const { allUserController, deleteUserController } = require("../controllers/adminController");
const _ = express.Router();





_.get("/all-user", allUserController)
_.delete("/delete-user/:id", deleteUserController)

module.exports = _;