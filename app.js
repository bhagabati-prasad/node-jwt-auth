const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const hbs = require("hbs");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 4000;

// middlewares and view engine
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "hbs");
hbs.registerPartials("./views/partials");

// database connection
const dburi =
  "mongodb+srv://truncation:popsot@123@cluster0.xbb17.mongodb.net/node-auth";
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
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/dashboard", (req, res) => res.render("dashboard"));
app.use(authRoutes);

// app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
