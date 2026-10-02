const express = require("express");
const { 
    userController, 
    updateController
} = require("../controllers/userController");
const _ = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API endpoints
 */

/**
 * @swagger
 * /api/v1/user/products:
 *   get:
 *     summary: Get user products test route
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hello user message
 *       500:
 *         description: Internal Server Error
 */
_.get("/alluser", userController)

/**
 * @swagger
 * /api/v1/user/update/profile/{id}:
 *   post:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, deactive]
 *     responses:
 *       200:
 *         description: User Updated
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal Server Error
 */
_.post("/update/profile/:id", updateController)


module.exports = _;