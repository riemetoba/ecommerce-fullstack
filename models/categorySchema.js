/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, deactive, reject]
 *           default: deactive
 */

const mongoose = require('mongoose')
const {Schema} = mongoose

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'deactive', 'reject'],
        default: 'deactive'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subCategory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory'
        }
    ]
})

module.exports = mongoose.model("Category", categorySchema)