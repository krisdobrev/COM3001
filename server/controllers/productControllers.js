const mongoose = require("mongoose");
const Product = mongoose.model("product");

// Create a product
exports.post_product = (req, res, next) => {
  const newProduct = new Product(req.body);
  newProduct.save().then((product) => res.json(product));
};

// Retrieve all products
exports.get_items = (req, res) => {
  Product.find().then((products) => res.json(products));
};

// Retrieve one product by ID

exports.get_oneProduct = (req, res) => {
  Product.findById.then((product) => res.json(product));
};

// Retrieve products of certain category

exports.get_categoryOfProducts = (req, res) => {
  Product.find({ category: req.params.category }).then(function (products) {
    res.json(products);
  });
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
