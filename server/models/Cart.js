const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
  },
  items: [
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
  total: {
    type: Number,
    required: true,
  },
});

mongoose.model("cart", cartSchema);
