const express = require("express");
const {
    uploadImages,
    removeImages,
} = require("../controllers/cloudinary");
const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

router.route('/uploadimages').post(authCheck, adminCheck, uploadImages)
router.route('/removeimages').post(authCheck, adminCheck, removeImages)

module.exports = router;
