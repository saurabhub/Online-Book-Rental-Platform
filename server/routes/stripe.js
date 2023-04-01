const express = require('express')
const {
createPaymentIntent,
  } = require("../controllers/stripe");
const router = express.Router()

const { authCheck } = require("../middlewares/auth");

router.route('/create-payment-intent').post(authCheck, createPaymentIntent)

module.exports = router