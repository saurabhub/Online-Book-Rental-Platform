const Author = require("../models/author");
const slugify = require("slugify");

const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Author({ name, slug: slugify(name) }).save());
  } catch (error) {
    console.log("CREATE AUTHOR ERR : ", error)
    res.status(400).send("Create Author failed");
  }
};
const listAuthors = async (req, res) => {
  res.json(await Author.find({}).sort({ createdAt: -1 }).exec());
};
const readAuthor = async (req, res) => {
  res.json(await Author.findOne({ slug: req.params.slug }).exec());
};
const updateAuthor = async (req, res) => {
    const { name } = req.body;
  try {
    const updatedAuthor = await Author.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true },
    );
    res.json( updatedAuthor );
  } catch (error) {
    console.log("UPDATE AUTHOR ERR: ", error)
    res.status(400).send("Update Author failed");
  }
};
const removeAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deletedAuthor );
  } catch (error) {
    console.log("REMOVE AUTHOR ERR: ", error)
    res.status(400).send("Author delete failed");
  }
};

module.exports = {
  createAuthor,
  listAuthors,
  updateAuthor,
  removeAuthor,
  readAuthor,
};
