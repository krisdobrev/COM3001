const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const User = mongoose.model("users");
const Order = mongoose.model("order");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const endpointSecret = "whsec_...";

exports.get_orders = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
};

exports.getAllOrders = async (req, res) => {
  Order.find().then((orders) => res.json(orders));
};
exports.testCheckout = async (req, res) => {
  const { total } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "gbp",
    payment_method_types: ["card", "wechat_pay"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, address, zipCode, city, email, paymentOption } = req.body;

    let cart = await Cart.findOne({ userId });

    const order = await Order.create({
      userId,
      products: cart.products,
      details: {
        name: fullName,
        address: address + "," + zipCode + "," + city,
        email: email,
      },
      total: cart.total,
      payment: paymentOption,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
