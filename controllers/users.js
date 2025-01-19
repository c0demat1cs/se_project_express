const bcrypt = require("bcryptjs"); // import bcrypt
const User = require("../models/user"); // import the User model
const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
} = require("../utils/errors"); // import the error messages

// route handler to get all users
const getUsers = (req, res) => {
  console.log("getUsers");
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// route handler to get a single user by ID
const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// route handler to create a new user
const createUser = (req, res) => {
  // pull information from the body of the request
  const { name, avatar, email, password } = req.body;
  console.log(req.body);
  // hash the password
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    // check that there's not already an existing user with the same email matching the one in req.body
    .catch((err) => {
      console.error(err);
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// export the route handlers
module.exports = { getUsers, createUser, getUserById };
