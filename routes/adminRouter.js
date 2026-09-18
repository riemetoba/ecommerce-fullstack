const express = require("express");
const { allUserController, deleteUserController, activeUserController, deactiveUserController, updateUserController, singleUserController } = require("../controllers/adminController");
const _ = express.Router();





_.get("/all-user", allUserController)
_.delete("/delete-user/:id", deleteUserController)
_.get("/user/:id", singleUserController)
_.get("/active/user", activeUserController)
_.get("/deactive/user", deactiveUserController)
_.post("/update/user/:id", updateUserController)

module.exports = _;