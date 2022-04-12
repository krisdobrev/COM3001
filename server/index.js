const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const http = require("http"); // new
const bodyParser = require("body-parser"); // new
const morgan = require("morgan"); // new
//const cors = require("cors"); // new

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI).catch((err) => console.log(err));

const app = express();

app.use(morgan("combined")); // new
//app.use(cors); // new
app.use(bodyParser.json({ type: "*/*" })); // new
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./routes/authentication")(app);

const PORT = process.env.PORT || 5000; // new
const server = http.createServer(app); // new
server.listen(PORT); // new
console.log("Server listening on:", PORT);
//app.listen(PORT);
