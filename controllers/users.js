const User = require("../models/user"); // import the User model
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors"); // import the error messages

// route handler to get all users
const getUsers = (req, res) => {
  console.log("getUsers");
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

// route handler to get a single user by ID
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

// route handler to create a new user
const createUser = (req, res) => {
  // pull information from the body of the request
  const { name, avatar } = req.body;
  console.log(req.body);
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUserById };
