const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname + "/out")));

app.get("/", function (req, res) {
  res.json("HELLO")
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "out", "login.html"));
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "out", "404.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log({ __dirname });
  console.log(`Server running is port: ${port}`);
});
