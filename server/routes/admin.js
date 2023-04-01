const express = require("express");
const {
listOrders,
orderStatus,
} = require("../controllers/admin");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.use('/admin', authCheck, adminCheck)
router.route('/admin/orders').get(listOrders)
router.route('/admin/order-status').put(orderStatus)

module.exports = router;
