//Loads from the .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Load required packages
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
const public = path.join(__dirname, "public");

//Load passport
const initializePassport = require("./passport");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

//Sets up array for users
const users = [{ name: "admin", email: "admin@admin.com", password: "admin" }];

app.use(express.static(public));

//Sets up bodyParser
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//Sets up the mustache files
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

//Initializes Passport
app.use(passport.initialize());
app.use(passport.initialize());
app.use(methodOverride("_method"));

const router = require("./routes/wellnessRoutes");

//Sets up homepage
app.get("/homepage.html", (req, res) => {
  res.render("/homepage.html");
});

//Login Authentication
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "welcome.html",
    failureRedirect: "/login",
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

//Sets the logout button to go to the home page
app.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("homepage.html");
  });
});

//Sets only authenticated users can access beyond the login page
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

//Sets authenticated users back to the homepage
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
  console.log("Server started on port 3000. Ctrl^C to stop running.");
});
