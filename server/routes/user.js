const express = require('express')
const {
    userCart,
    getUserCart,
    emptyCart,
    saveAddress,
    applyCoupon,
    createOrder,
    createCashOrder,
    listUserOrders,
    addToWishlist,
    wishlist,
    removeFromWishlist,
  } = require("../controllers/user");
const router = express.Router()

const { authCheck } = require("../middlewares/auth");

router.use('/user', authCheck)
router.route('/user/cart').post(userCart).get(getUserCart).delete(emptyCart)
router.route('/user/cart/coupon').post(applyCoupon)
router.route('/user/address').post(saveAddress)
router.route('/user/order').post(createOrder)
router.route('/user/cash-order').post(createCashOrder)
router.route('/user/orders').get(listUserOrders)
router.route('/user/wishlist').post(addToWishlist).get(wishlist)
router.route('/user/wishlist/:productId').put(removeFromWishlist)


module.exports = router