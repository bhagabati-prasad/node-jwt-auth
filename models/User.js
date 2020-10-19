const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
    unique: true,
  },
  // email: {
  //   type: String,
  //   required: [true, "Please enter an username"],
  //   unique: true,
  //   lowercase: true,
  //   validate: [isEmail, "Please enter a valid email"],
  // },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [2, "Minimum password length must be 2 characters"],
  },
});

// connect the schema model with database
const User = mongoose.model("user", userSchema);

// export the module
module.exports = User;
