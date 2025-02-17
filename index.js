require("dotenv").config();
const express = require("express");
const routes = require("./controllers");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use all routes from controllers/index.js
app.use("/", routes);

module.exports = app;