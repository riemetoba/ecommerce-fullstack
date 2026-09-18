const express = require("express");
const {registrationController, loginController, verifyEmailController, forgotPasswordController, resetPasswordController} = require("../controllers/authController");
const _ = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API endpoints
 */

/**
 * @swagger
 * /api/v1/auth/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - confirmPassword
 *               - terms
 *               - role
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               terms:
 *                 type: boolean
 *               role:
 *                 type: string
 *                 enum: [user, admin, vendor]
 *     responses:
 *       201:
 *         description: Registration Successful
 *       400:
 *         description: Bad Request (User already exist, passwords do not match, invalid email)
 *       500:
 *         description: Internal Server Error
 */
_.post("/registration", registrationController)

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid Credential or Bad Request
 *       500:
 *         description: Internal Server Error
 */
_.post("/login", loginController)

/**
 * @swagger
 * /api/v1/auth/verify/{token}:
 *   post:
 *     summary: Verify user email using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token sent to email
 *     responses:
 *       200:
 *         description: Email verified successfully!
 *       400:
 *         description: Invalid or expired token
 */
_.post("/verify/:token", verifyEmailController)

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Check your Email for resetting password
 *       400:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
_.post("/forgot-password", forgotPasswordController)

/**
 * @swagger
 * /api/v1/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Reset password token sent to email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset done
 *       400:
 *         description: Passwords do not match, or Invalid/expired token
 */
_.post("/reset-password/:token", resetPasswordController)

module.exports = _;