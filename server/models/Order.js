const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
  },
  products: [
    {
      productId: {
        type: String,
      },
      title: String,
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: Number,
    },
  ],
  details: [
    {
      name: String,
      address: String,
      email: String,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("order", orderSchema);