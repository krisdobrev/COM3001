const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const Product = mongoose.model("product");

exports.get_cart_products = async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart && cart.products.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.add_cart_product = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(404).send("Product not found!");
    }
    const price = product.price;
    const title = product.title;
    const image = product.image;

    if (cart) {
      // if cart exists for the user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, title, quantity, price, image });
      }
      cart.total += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        products: [{ productId, title, quantity, price, image }],
        total: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.delete_product = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.total -= productItem.quantity * productItem.price;
      cart.products.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.update_product = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      if (productItem.quantity > quantity) {
        cart.total -= (productItem.quantity - quantity) * productItem.price;
        productItem.quantity = quantity;
      } else if (productItem.quantity < quantity) {
        cart.total += (quantity - productItem.quantity) * productItem.price;
        productItem.quantity = quantity;
      } else {
        // do nothing
      }
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
