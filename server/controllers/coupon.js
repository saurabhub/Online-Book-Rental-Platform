const Coupon = require('../models/coupon')

const createCoupon = async (req, res) => {
    try {
        const {name, expiry, discount} = req.body.coupon
        res.json(await new Coupon({name, expiry, discount}).save())
    } catch (error) {
        console.log("CREATE COUPON ERROR: ", error)
    }
}
const removeCoupon = async (req, res) => {
    try {
        res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec())
    } catch (error) {
        console.log("Remove COUPON ERROR: ", error)
    }
}
const listCoupons = async (req, res) => {
    try {
        console.log()
        res.json(await Coupon.find({}).sort({createdAt: -1}).exec())

    } catch (error) {
        console.log("List COUPON ERROR: ", error)
    }
}

module.exports = {
    createCoupon,
    listCoupons,
    removeCoupon,
}