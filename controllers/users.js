const bcrypt = require("bcryptjs"); // import bcrypt
const jwt = require("jsonwebtoken"); // import jsonwebtoken
const { JWT_SECRET } = require("../utils/config"); // import the JWT_SECRET
const User = require("../models/user"); // import the User model
const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  UNAUTHORIZED,
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

// route handler to get the current user
const getCurrentUser = (req, res) => {
  const { userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) =>
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
    )
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
    // handle the email already exists case
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }
      throw err;
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

// route handler to log in a user
const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token }); // return token to the user
    })
    // if the email and password are incorrect, the controller should return a 401 status code
    .catch(() => {
      res.status(UNAUTHORIZED).send({ message: "Authorization Required" });
    });
};

// route to update user
const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body; // Extract name and avatar from the request body
  const { _id } = req.user; // Get the user ID from req.user

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true } // Enable validators and return the updated document
  )
    .orFail() // Throw an error if the user is not found
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// export the route handlers
module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
