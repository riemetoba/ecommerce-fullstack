const express = require("express");
const { allUserController, deleteUserController, activeUserController, deactiveUserController, updateUserController, singleUserController } = require("../controllers/adminController");
const _ = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin API endpoints
 */

/**
 * @swagger
 * /api/v1/admin/all-user:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal Server Error
 */
_.get("/all-user", allUserController)

/**
 * @swagger
 * /api/v1/admin/delete-user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
_.delete("/delete-user/:id", deleteUserController)

/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
_.get("/user/:id", singleUserController)

/**
 * @swagger
 * /api/v1/admin/active/user:
 *   get:
 *     summary: Get all active users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active users
 *       500:
 *         description: Internal Server Error
 */
_.get("/active/user", activeUserController)

/**
 * @swagger
 * /api/v1/admin/deactive/user:
 *   get:
 *     summary: Get all deactive users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deactive users
 *       500:
 *         description: Internal Server Error
 */
_.get("/deactive/user", deactiveUserController)

/**
 * @swagger
 * /api/v1/admin/update/user/{id}:
 *   post:
 *     summary: Update user details by ID
 *     tags: [Admin]
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
 *               status:
 *                 type: string
 *                 enum: [active, deactive]
 *               role:
 *                 type: string
 *                 enum: [user, admin, vendor]
 *     responses:
 *       200:
 *         description: User Updated
 *       500:
 *         description: Internal Server Error
 */
_.post("/update/user/:id", updateUserController)

module.exports = _;