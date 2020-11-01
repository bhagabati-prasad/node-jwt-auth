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
    required: [true, "Please enter password"],
    minlength: [3, "Minimum password length is 3 character"],
  },
});

// fires a function before doc is saved to db
// Here we're gonna hash password before saving data to the db.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); // $2b$10$
  // const salt = 12; // default = 10
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// fires a function after doc is saved to db
userSchema.post("save", (doc, next) => {
  console.log("new user created", doc);
  next();
});

// static method to login user
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
