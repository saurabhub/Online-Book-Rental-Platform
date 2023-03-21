const express = require("express");
const {
  createCategory,
  listCategories,
  readCategory,
  updateCategory,
  removeCategory,
  getCategorySubs,
} = require("../controllers/category");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route("/categories").get(listCategories);
router.route("/category/:slug").get(readCategory);
router.route("/category/subs/:_id").get(getCategorySubs)

router.use('/category', authCheck, adminCheck)
router.route('/category').post(createCategory)
router.route('/category/:slug').put(updateCategory).delete(removeCategory)

module.exports = router;
