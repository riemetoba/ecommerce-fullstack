const express = require("express");
const { allUserController, deleteUserController, activeUserController, deactiveUserController } = require("../controllers/adminController");
const _ = express.Router();





_.get("/all-user", allUserController)
_.delete("/delete-user/:id", deleteUserController)
_.get("/user/:id", allUserController)
_.get("/active/user", activeUserController)
_.get("/deactive/user", deactiveUserController)

module.exports = _;