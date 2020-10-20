const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [3, "Minimum password length is 3 character"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
