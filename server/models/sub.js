const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const SubSchema = new mongoose.Schema(
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
            lowercase: true,
        },
        parentCategory: {
            type: ObjectId,
            ref: "Category",
            required: true,
        },
    },
    {timestamps: true},
);

SubSchema.index({ slug: 1, parentCategory: 1 }, { unique: true });

module.exports = mongoose.model('Sub', SubSchema)