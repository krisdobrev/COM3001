const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: false,
  },
  email: String,
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

mongoose.model("users", userSchema);
