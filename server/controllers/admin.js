const Order = require("../models/order");

const listOrders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate({
      path : 'products',
      populate : {
        path : 'product',
        populate : {
          path : 'author publisher'
        }
      }
    })
    .exec();

  res.json(allOrders);
};

const orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updatedStatus = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(updatedStatus);
};

module.exports = {
  listOrders,
  orderStatus,
};
