const express = require("express");
const {
  createProduct,
  listProducts,
  removeProduct,
  readProduct,
  updateProduct,
  listProductsByCondition,
  getProductsCount,
  productRating,
  listRelatedProducts,
} = require("../controllers/product");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route("/product/:slug").get(readProduct);
router.route('/products/total').get(getProductsCount);
router.route("/products/:count").get(listProducts);
router.route('/products').post(listProductsByCondition);
router.route("/product/related/:productId").get(listRelatedProducts);

router.route('/product/rating/:productId').put(authCheck, productRating)

router.use('/product', authCheck, adminCheck)
router.route('/product').post(createProduct)
router.route('/product/:slug').put(updateProduct).delete(removeProduct)

module.exports = router;
