const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ Josh: "is a silly cow" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
