const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const authRoutes = require("./routes/authentication");

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
