const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const cors = require("cors"); // import cors
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

// register main routes
app.use(routes);

app.use(errorHandler);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
