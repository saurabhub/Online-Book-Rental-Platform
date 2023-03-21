const express = require("express");
const {
  createAuthor,
  listAuthors,
  readAuthor,
  updateAuthor,
  removeAuthor,
} = require("../controllers/author");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route("/authors").get(listAuthors);
router.route("/author/:slug").get(readAuthor);

router.use('/author', authCheck, adminCheck)
router.route('/author').post(createAuthor)
router.route('/author/:slug').put(updateAuthor).delete(removeAuthor)

module.exports = router;
