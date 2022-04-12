const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

function jwtUser(user) {
  //arrow function
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, keys.cookieKey);
}

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).send({ error: "Email is already in use." });
    } else {
      const user = await new User({
        email: email,
        password: password,
      }).save();
      res.json({ token: jwtUser(user) });
    }
  } catch (err) {
    return next(err);
  }
};

exports.signin = (req, res, next) => {
  res.send({ token: jwtUser(req) });
};
