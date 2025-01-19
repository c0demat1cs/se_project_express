// Initialize Mongoose
const mongoose = require("mongoose"); // import the mongoose package
// import the validator package
const validator = require("validator");
// name - the name of the user, a required string from 2 to 30 chars
// avatar - required string for the URL of the user's image
// validate - checks if the URL is valid
// message - error message if the URL is invalid
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  // email - the email of the user, a required string
  email: {
    type: String,
    required: [true, "The email field is required"],
    // validate - checks if the email is valid
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: "You must enter a valid email",
    },
  },
  // password - the password of the user, a required string
  password: { type: String, required: true, minlength: 8, select: false },
});

// export the User model
module.exports = mongoose.model("user", userSchema);
