const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

const userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  let existingUserCart = await Cart.findOne({ orderedBy: user._id }).exec();

  if (existingUserCart) {
    existingUserCart.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  // console.log("Cart Created: ", newCart);
  res.json({ ok: true });
};

const getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();
  // console.log("CART FETCHED: ", cart)

  const { cartTotal, totalAfterDiscount } = cart;
  res.json({ products: cart?.products, cartTotal, totalAfterDiscount });
};

const emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  // res.json({ok: true})
  res.json(cart);
};

const saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

const applyCoupon = async (req, res) => {
  const { coupon } = req.body;
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  // console.log("Valid coupon", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product", "_id title price")
    .exec();

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();
  res.json(totalAfterDiscount);
};

const createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();
  // console.log(user)

  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();
  // console.log("create Order products: ", products)

  let newOrder = await new Order({
    products: userCart?.products,
    cartTotal: userCart?.cartTotal,
    totalAfterDiscount: userCart?.totalAfterDiscount,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updatedOrder = await Product.bulkWrite(bulkOption, {});

  // console.log("new order: ", newOrder)
  res.json({ ok: true });
};

const listUserOrders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
  .sort({ createdAt: -1 })
    .populate({
      path: "products",
      populate: {
        path: "product",
        populate: {
          path: "author publisher",
        },
      },
    })
    .exec();

  res.json(userOrders);
};

const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();
  res.json({ ok: true });
};
const wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};
const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();
  res.json({ ok: true });
};

const createCashOrder = async (req, res) => {
  const { isCOD, couponApplied } = req.body;

  if(!isCOD) return res.status(400).send("Create cash Order failed")
  
  const user = await User.findOne({ email: req.user.email }).exec();
  // console.log(user)

  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();
  // console.log("create Order products: ", products)
  let finalAmount = 0;
  // console.log("couponApplied:", couponApplied)
  // console.log("totalAfterDiscount", totalAfterDiscount)

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = parseInt(userCart.totalAfterDiscount * 100);
  } else {
    finalAmount = parseInt(userCart.cartTotal * 100);
  }

  let newOrder = await new Order({
    products: userCart?.products,
    cartTotal: userCart?.cartTotal,
    totalAfterDiscount: userCart?.totalAfterDiscount,
    paymentIntent: {
      id: uuidv4(),
      amount: finalAmount,
      currency: "inr",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderedBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();

  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updatedOrder = await Product.bulkWrite(bulkOption, {});

  // console.log("new order: ", newOrder)
  res.json({ ok: true });
};

module.exports = {
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
};
