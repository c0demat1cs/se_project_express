const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose
const usersRouter = require("./routes/users"); // import the users router
const itemRouter = require("./routes/clothingItem"); // import item router
// const routes = require("./routes");

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
app.use((req, res, next) => {
  req.user = {
    _id: "675cd0260bc2ea74274880e4", // paste the _id of the test user created in the previous step
  };
  next();
});

// allows to register routes and middleware
app.use(express.json()); // parse JSON bodies
app.use("/", usersRouter); // register the users router
// if requires are sent to "/", then sent to userRouter
app.use("/", itemRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
