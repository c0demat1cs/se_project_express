const bcrypt = require("bcryptjs"); // import bcrypt
const jwt = require("jsonwebtoken"); // import jsonwebtoken
const { JWT_SECRET } = require("../utils/config"); // import the JWT_SECRET
const User = require("../models/user"); // import the User model
const BadRequestError = require("../customErrors/bad-request-err");
const UnauthorizedError = require("../customErrors/unauthorized-err");
const NotFoundError = require("../customErrors/not-found-err");
const ConflictError = require("../customErrors/conflict-err");

// route handler to get the current user
const getCurrentUser = (req, res, next) => {
  // user ID destructured from req.user
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) =>
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

// route handler to create a new user
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  // hash the password
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      };

      res.send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Email already in use"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

// route handler to log in a user
const login = (req, res, next) => {
  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  // Authenticate the user
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token }); // return the token to the user
    })
    .catch(() => {
      next(new UnauthorizedError("Invalid email or password"));
    });
};

// route to update user
const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body; // Extract name and avatar from the request body
  const { _id } = req.user; // Get the user ID from req.user

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true } // Enable validators and return the updated document
  )
    .orFail(() => {
      throw new NotFoundError("User not found");
    }) // Throw an error if the user is not found
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
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

// export the route handlers
module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
