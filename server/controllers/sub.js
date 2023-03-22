const Sub = require("../models/sub");
const slugify = require("slugify");
const Product = require("../models/product");

const createSub = async (req, res) => {
  try {
    const { name, parentCategory } = req.body;
    // const sub = await new Sub({name, slug: slugify(name)}).save()
    res.json(await new Sub({ name, parentCategory, slug: slugify(name) }).save());
  } catch (error) {
    console.log("CREATE SUB ERR: ", error);
    res.status(400).json({
      error: error.message
    })
  }
};
const listSubs = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};
const readSub = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec()

  const products = await Product.find({subs: sub})
  .populate("category")
  .populate("subs")
  .exec()

  res.json({
    sub,
    products
  })
};
const updateSub = async (req, res) => {
    const { name, parentCategory } = req.body;
  try {
    const updatedSub = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parentCategory },
      { new: true },
    );
    res.json( updatedSub );
  } catch (error) {
    console.log("UPDATE SUB ERR: ", error);
    res.status(400).json({
      error: error.message
    })
  }
};
const removeSub = async (req, res) => {
  try {
    const deletedSub = await Sub.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deletedSub );
  } catch (error) {
    console.log("DELETE SUB ERR: ", error);
    res.status(400).json({
      error: error.message
    })
  }
};

module.exports = {
  createSub,
  listSubs,
  updateSub,
  removeSub,
  readSub,
};
