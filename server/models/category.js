const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            trim: true,
            minlength: [3, "too short"],
            maxlength: [32, "too long"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Category', CategorySchema)