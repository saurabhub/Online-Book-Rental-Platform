const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload

const uploadImages = async (req, res) => {
  const result = cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });

  result
    .then((data) => {
      console.log(data);
      console.log(data.secure_url);
      res.json({
        public_id: data.public_id,
        url: data.secure_url,
      });
    })
    .catch((err) => {
      console.log("UPLOAD IMAGE ERR: ", err);
    });
};

const removeImages = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};

module.exports = {
  uploadImages,
  removeImages,
};
