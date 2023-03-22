const Category = require("../models/category");
const slugify = require("slugify");
const Sub = require("../models/sub");
const Product = require("../models/product");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // const category = await new Category({name, slug: slugify(name)}).save()
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (error) {
    // console.log(error)
    res.status(400).send("Create category failed");
  }
};
const listCategories = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};
const readCategory = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec()

  const products = await Product.find({category})
  .populate("category")
  .exec()

  res.json({
    category,
    products
  })
};
const updateCategory = async (req, res) => {
    const { name } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true },
    );
    res.json( updatedCategory );
  } catch (error) {
    res.status(400).send("Update Category failed");
  }
};
const removeCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deletedCategory );
  } catch (error) {
    res.status(400).send("Category delete failed");
  }
};

const getCategorySubs = async (req, res) => {
  res.json(await Sub.find({parentCategory: req.params._id}).exec())
};

module.exports = {
  createCategory,
  listCategories,
  updateCategory,
  removeCategory,
  readCategory,
  getCategorySubs,
};
