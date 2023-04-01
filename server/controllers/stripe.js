const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const createPaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  let finalAmount = 0;
  // console.log("couponApplied:", couponApplied)
  // console.log("totalAfterDiscount", totalAfterDiscount)

  if (couponApplied && totalAfterDiscount) {
    finalAmount = parseInt(totalAfterDiscount * 100);
  } else {
    finalAmount = parseInt(cartTotal * 100);
  }
  // console.log("finalAmount : ", finalAmount)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};

module.exports = {
  createPaymentIntent,
};
