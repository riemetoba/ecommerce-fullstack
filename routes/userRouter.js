const express = require("express");
const { 
    userController, 
    updateController, 
    createCategoryController, 
    getAllCategoryController, 
    updateCategoryController, 
    deleteCategoryController 
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
_.get("/products", userController)

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

/**
 * @swagger
 * /api/v1/user/create/category:
 *   post:
 *     summary: Create a new category
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Category already Exist
 *       500:
 *         description: Internal Server Error
 */
_.post("/create/category", createCategoryController)

/**
 * @swagger
 * /api/v1/user/all/category:
 *   get:
 *     summary: Get all categories
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Category
 *       500:
 *         description: Internal Server Error
 */
_.get("/all/category", getAllCategoryController)

/**
 * @swagger
 * /api/v1/user/update/category/{id}:
 *   post:
 *     summary: Update a category
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category Updated
 *       500:
 *         description: Internal Server Error
 */
_.post("/update/category/:id", updateCategoryController)

/**
 * @swagger
 * /api/v1/user/delete/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category Deleted
 *       500:
 *         description: Internal Server Error
 */
_.delete("/delete/category/:id", deleteCategoryController)

module.exports = _;