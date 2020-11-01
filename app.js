const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// configure envirenment variables
const dotenv = require("dotenv");
dotenv.config();

// set view engine
const hbs = require("hbs");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./midddlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares and view engine
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "hbs");
hbs.registerPartials("./views/partials");

// database connection
const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xbb17.mongodb.net/node-auth`;
mongoose
  .connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  )
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser); // applies middleware to all routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/dashboard", requireAuth, (req, res) => res.render("dashboard"));
app.use(authRoutes);
app.get("*", (req, res) => res.render("error"));

// -------- Unnecessary codes. Only for knowledge --------------
app.get("/set-cookies", (req, res) => {
  // secure: true -> cookie is only be sent over 'https' secure connection
  // httpOnly: true -> i.e we can't access cookie from front-end javascript
  // res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
  // both of them are important when it comes to auth in production mode

  res.cookie("newUser", "", { maxAge: 1000 * 60 * 60 * 24 });
  res.send("you get the cookies!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});
