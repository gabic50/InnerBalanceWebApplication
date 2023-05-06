//The routes set which page the user will view within the application
const express = require("express");
const router = express.Router();
const controller = require("../controllers/wellnessControllers.js");
router.get("/fitness", controller.landing_page_fitness);
router.get("/nutrition", controller.landing_page_nutrition);
router.get("/lifestyle", controller.landing_page_lifestyle);
router.get("/achievements", controller.landing_page_achievements);
//router.get("/login", controller.landing_page_login);
//router.get("/register", controller.landing_page_register);

//When the application is first open it will go to the home page
router.get("/", function (req, res) {
  res.redirect("/homepage.html");
});

router.get("/about", function (req, res) {
  res.redirect("/about.html");
});

router.get("/login", function (req, res) {
  res.render("login", { title: "login" });
});

router.get("/register", function (req, res) {
  res.render("register", { title: "register" });
});

router.get("/newFitness", controller.new_entries_fitness);
router.post("/newFitness", controller.post_new_entry_fitness);
router.get("/newNutrition", controller.new_entries_nutrition);
router.post("/newNutrition", controller.post_new_entry_nutrition);
router.get("/newLifestyle", controller.new_entries_lifestyle);
router.post("/newLifestyle", controller.post_new_entry_lifestyle);

//Error handling
router.use(function (req, res) {
  res.status(404);
  res.type("text/plain");
  res.send("404 Not found.");
});

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

module.exports = router;
