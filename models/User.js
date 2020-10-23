const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// fires a function before doc is saved to db
// Here we're gonna hash password before saving data to the db.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); // $2b$10$
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// fires a function after doc is saved to db
userSchema.post("save", (doc, next) => {
  console.log("new user created", doc);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
