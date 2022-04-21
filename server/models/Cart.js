const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
      image: String,
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

mongoose.model("cart", cartSchema);
