const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const cors = require("cors"); // import cors
require("dotenv").config(); // import dotenv
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes"); // import the routes
const errorHandler = require("./middlewares/error-handler");

const app = express(); // create an express application
const { PORT = 3001 } = process.env; // set the port to 3001

// connect to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// enable cors
app.use(cors());

// middleware
app.use(express.json()); // parse JSON bodies

// enable the error logger
app.use(requestLogger);
// test route to check the error logger
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
// register main routes
app.use(routes);
// enable the error logger
app.use(errorLogger);
// celebrate error handler
app.use(errors());
// centralized error handler
app.use(errorHandler);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
