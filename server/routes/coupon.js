const express = require("express");
const {
  createCoupon,
  listCoupons,
  removeCoupon,
} = require("../controllers/coupon");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route("/coupons").get(listCoupons);

router.use('/coupon', authCheck, adminCheck)
router.route('/coupon').post(createCoupon)
router.route('/coupon/:couponId').delete(removeCoupon)

module.exports = router;
