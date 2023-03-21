const express = require("express");
const {
  createPublisher,
  listPublishers,
  readPublisher,
  updatePublisher,
  removePublisher,
} = require("../controllers/publisher");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route("/publishers").get(listPublishers);
router.route("/publisher/:slug").get(readPublisher);

router.use('/publisher', authCheck, adminCheck)
router.route('/publisher').post(createPublisher)
router.route('/publisher/:slug').put(updatePublisher).delete(removePublisher)

module.exports = router;
