const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error is occured", err));

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routers/auth"));

app.listen(8000, () => console.log("Server Started"));
