/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - terms
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         terms:
 *           type: boolean
 *         role:
 *           type: string
 *           enum: [user, admin, vendor]
 *           default: user
 *         status:
 *           type: string
 *           enum: [active, deactive]
 *           default: deactive
 *         isverified:
 *           type: boolean
 *           default: false
 */


const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'deactive'
    },
    isverified: {
        type: Boolean,
        default: false
    }
})





module.exports = mongoose.model("User", userSchema)