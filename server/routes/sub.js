const express = require("express");
const {
  createSub,
  listSubs,
  readSub,
  updateSub,
  removeSub,
} = require("../controllers/sub");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route("/Subs").get(listSubs);
router.route("/sub/:slug").get(readSub);

router.use('/sub', authCheck, adminCheck)
router.route('/sub').post(createSub)
router.route('/sub/:slug').put(updateSub).delete(removeSub)

module.exports = router;
