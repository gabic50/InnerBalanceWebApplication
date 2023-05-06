if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const public = path.join(__dirname, "public");

const initializePassport = require("./passport");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [{ name: "admin", email: "admin@admin.com", password: "admin" }];

app.use(express.static(public));

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.initialize());
app.use(methodOverride("_method"));

const router = require("./routes/wellnessRoutes");

app.get("/homepage.html", (req, res) => {
  res.render("/homepage.html");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "welcome.html",
    failureRedirect: "/lifestyle",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("homepage.html");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("homepage.html");
  }
  next();
}

app.use("/", router);

// Starting the server and listening on port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port ${PORT}. Ctrl+C to stop running.");
});
