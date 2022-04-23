const mongoose = require("mongoose");
const Product = mongoose.model("product");

// Create a product
exports.post_product = (req, res, next) => {
  const newProduct = new Product(req.body);
  newProduct.save().then((product) => res.json(product));
};

// Retrieve all products
exports.get_products = (req, res) => {
  Product.find().then((products) => res.json(products));
};

// Retrieve one product by ID

exports.get_oneProduct = async (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const id = ObjectId(req.params.id); // convert to ObjectId

  const product = await Product.findById({ _id: id }).exec();

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

// Retrieve products by category

exports.get_categoryOfProducts = async (req, res) => {
  const category = req.params.category;

  const result = await Product.find(
    {
      category: { $regex: new RegExp(category), $options: "is" },
      isActive: true,
    },
    { title: 1, description: 1, image: 1, category: 1, price: 1, _id: 0 }
  );

  res.status(200).json({ searchResult: result, searchTitle: category });
};

//Retrieve products by title

exports.get_productsByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const result = await Product.find({
      title: new RegExp(".*" + title + ".*"),
    });
    res.json({ searchResult: result, searchTitle: title });
  } catch (err) {
    res.json({ searchResult: "We could not find a product by that name." });
  }
};

// Update product
module.exports.update_product = (req, res) => {
  Product.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
    product
  ) {
    Product.findOne({ _id: req.params.id }).then(function (product) {
      res.json(product);
    });
  });
};

//Delete product

module.exports.delete_product = (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id }).then(function (product) {
    res.json({ success: true });
  });
};
