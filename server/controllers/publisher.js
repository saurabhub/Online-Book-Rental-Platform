const Publisher = require("../models/publisher");
const slugify = require("slugify");

const createPublisher = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Publisher({ name, slug: slugify(name) }).save());
  } catch (error) {
    console.log("CREATE PUBLISHER ERR : ", error)
    res.status(400).send("Create Publisher failed");
  }
};
const listPublishers = async (req, res) => {
  res.json(await Publisher.find({}).sort({ createdAt: -1 }).exec());
};
const readPublisher = async (req, res) => {
  res.json(await Publisher.findOne({ slug: req.params.slug }).exec());
};
const updatePublisher = async (req, res) => {
    const { name } = req.body;
  try {
    const updatedPublisher = await Publisher.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true },
    );
    res.json( updatedPublisher );
  } catch (error) {
    console.log("UPDATE PUBLISHER ERR : ", error)
    res.status(400).send("Update Publisher failed");
  }
};
const removePublisher = async (req, res) => {
  try {
    const deletedPublisher = await Publisher.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deletedPublisher );
  } catch (error) {
    console.log("REMOVE PUBLISHER ERR : ", error)
    res.status(400).send("Publisher delete failed");
  }
};

module.exports = {
  createPublisher,
  listPublishers,
  updatePublisher,
  removePublisher,
  readPublisher,
};
