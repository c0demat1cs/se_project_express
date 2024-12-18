const mongoose = require("mongoose"); // import the mongoose package

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
});

// export the User model
module.exports = mongoose.model("user", userSchema);
