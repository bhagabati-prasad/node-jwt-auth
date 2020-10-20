const { handlebars } = require("hbs");
const User = require("../models/User");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.username = "that username already registered";
    return errors; // 1 >> We can return errors object here if error code is 11000
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err.errors);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors; // 2 >> Otherwise we can return here if validation failed
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_get = (req, res) => {
  res.render("signup");
};

module.exports.login_post = async (req, res) => {
  res.render("signup");
};
