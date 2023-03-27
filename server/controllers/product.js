const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");

const createProduct = async (req, res) => {
  try {
    // console.log(req.body)
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
    console.log(newProduct);
  } catch (error) {
    console.log("Create Product Error: ", error);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      error: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  res.json(
    await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subs")
      .populate("author")
      .populate("publisher")
      .sort([["createdAt", "desc"]])
      .exec()
  );
};

const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deletedProduct);
  } catch (error) {
    console.log("REMOVE PRODUCT ERR : ", error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const readProduct = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .populate("author")
    .populate("publisher")
    .exec();
  res.json(product);
  // console.log("PRODUCT", product)
};

const updateProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updatedProduct);
  } catch (error) {
    console.log("UPDATE PRODUCT ERR : ", error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const listProductsByCondition = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    res.json(
      await Product.find({})
        .skip((currentPage - 1) * perPage)
        .limit(parseInt(perPage))
        .populate("category")
        .populate("subs")
        .populate("author")
        .populate("publisher")
        .sort([[sort, order]])
        .exec()
    );
  } catch (error) {
    console.log("LIST PRODUCT BY CONDITION ERR : ", error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getProductsCount = async (req, res) => {
  res.json(await Product.find({}).estimatedDocumentCount().exec());
};

const productRating = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;
  // Check if user have left an rating already
  let existingRatingObject = product.ratings.find(
    (rating) => rating.postedBy.toString() === user._id.toString()
  );
  // if not then ADD else UPDATE
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    // console.log("rating ADDED:", ratingAdded);
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      {
        $set: { "ratings.$.star": star },
      },
      { new: true }
    ).exec();
    // console.log("rating UPDATED:", ratingUpdated);
    res.json(ratingUpdated);
  }
};

const listRelatedProducts = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("author")
    .populate("publisher")
    .populate("ratings")
    .exec();

  res.json(relatedProducts);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("ratings.postedBy", "_id name")
    .exec();
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("HANDLE PRICE ERR: ", error);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("HANDLE CATEGORY ERR: ", error);
  }
};

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    {
      $match: { floorAverage: stars },
    },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR: ", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("ratings.postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR: ", err);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  try {
    let products = await Product.find({ subs: sub })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("HANDLE SUB ERR: ", error);
  }
};
const handlePublisher = async (req, res, publisher) => {
  try {
    let products = await Product.find({ publisher })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("publisher", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("HANDLE PUBLISHER ERR: ", error);
  }
};
const handleAuthor = async (req, res, author) => {
  try {
    let products = await Product.find({ author })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("author", "_id name")
      .populate("ratings.postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("HANDLE AUTHOR ERR: ", error);
  }
};

const searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, author, publisher } = req.body;

  if (query) {
    // console.log("Query: ", query)
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStar(req, res, stars);
  }

  if(sub){
    await handleSub(req, res, sub)
  }
  if(publisher){
    await handlePublisher(req, res, publisher)
  }
  if(author){
    await handleAuthor(req, res, author)
  }
};

module.exports = {
  createProduct,
  listProducts,
  removeProduct,
  readProduct,
  updateProduct,
  listProductsByCondition,
  getProductsCount,
  productRating,
  listRelatedProducts,
  searchFilters,
};
