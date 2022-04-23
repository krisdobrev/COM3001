const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
  },
  products: [],
  details: {
    name: String,
    address: String,
    email: String,
  },

  total: {
    type: Number,
    required: true,
  },
  date_ordered: {
    type: Date,
    default: Date.now,
  },
  payment: String,
});

mongoose.model("order", orderSchema);
