const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const routes = require("./routes");

const app = express(); // create an express application
const { PORT = 3001 } = process.env; // set the port to 3001

// connect to the database
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// middleware
app.use(express.json()); // parse JSON bodies

app.use((req, res, next) => {
  req.user = {
    _id: "676068350c6ffc37fcb92eae", // paste the _id of the test user created in the previous step
  };
  next();
});

// allows to register routes and middleware
app.use(routes);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
