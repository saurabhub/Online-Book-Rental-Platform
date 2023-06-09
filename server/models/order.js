const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
                count: Number,
            }
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        paymentIntent: {},
        orderStatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Cash On Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Completed",
            ],
        },
        orderedBy: {type: ObjectId, ref: "User"},
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Order', OrderSchema)