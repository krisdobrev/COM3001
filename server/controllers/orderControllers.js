const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const User = mongoose.model("users");
const Order = mongoose.model("order");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.StripeSK);

exports.get_orders = async (req, res) => {
  const userId = req.params.id;
  Order.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.json(orders));
};
exports.testCheckout = async (req, res) => {
  //const { total } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({ clientSecret: paymentIntent.client_secret });
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, address, zipCode, city, email, paymentOption } = req.body;

    let cart = await Cart.findOne({ userId });

    if (paymentOption === "cash") {
      const order = await Order.create({
        userId,
        products: cart.products,
        details: {
          name: fullName,
          address: address + "," + zipCode + "," + city,
          email: email,
        },
        total: cart.total,
        payment: "cash",
      });
    }
    // const { source } = req.body;

    // if (cart) {
    //   const charge = await stripe.charges.create({
    //     amount: cart.total,
    //     currency: "gbp",
    //     source: source,
    //     receipt_email: email,
    //   });
    //   if (!charge) throw Error("Payment failed");
    //   if (charge) {
    //     const order = await Order.create({
    //       userId,
    //       products: cart.products,
    //       total: cart.total,
    //     });
    //     const data = await Cart.findByIdAndDelete({ _id: cart.id });
    //     return res.status(201).send(order);
    //   }
    // } else {
    //   res.status(500).send("You do not have items in cart");
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
