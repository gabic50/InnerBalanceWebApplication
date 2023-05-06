const wellnessDAO = require("../models/wellnessModel");
const db = new wellnessDAO();

db.init();

exports.entries_list = function (req, res) {
  res.send("<h1>No Goals set.</h1>");
  db.getAllEntries();
};

exports.landing_page_achievements = function (req, res) {
  db.getAllCompletedEntries()
    .then((list) => {
      res.render("achievements", {
        title: "Achievements",
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.landing_page_fitness = function (req, res) {
  db.getAllFitnessEntries()
    .then((list) => {
      res.render("fitness", {
        title: "Fitness",
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.landing_page_nutrition = function (req, res) {
  db.getAllNutritionEntries()
    .then((list) => {
      res.render("nutrition", {
        title: "Nutrition",
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.landing_page_lifestyle = function (req, res) {
  db.getAllLifestyleEntries()
    .then((list) => {
      res.render("lifestyle", {
        title: "Lifestyle",
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.new_entries_fitness = function (req, res) {
  res.render("newEntry", {
    title: "Set Fitness Goal",
  });
};

exports.post_new_entry_fitness = function (req, res) {
  if (!req.body.goalTitle) {
    response.status(400).send("Entries must have an title.");
    return;
  }
  db.addEntry(
    req.body.goalTitle,
    req.body.description,
    req.body.category,
    req.body.startDate,
    req.body.endDate,
    req.body.complete
  );
  res.redirect("/fitness");
};

exports.new_entries_nutrition = function (req, res) {
  res.render("newEntry", {
    title: "Set Nutrition Goal",
  });
};

exports.post_new_entry_nutrition = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.goalTitle) {
    response.status(400).send("Entries must have an title.");
    return;
  }
  db.addEntry(
    req.body.goalTitle,
    req.body.description,
    req.body.category,
    req.body.startDate,
    req.body.endDate,
    req.body.complete
  );
  res.redirect("/nutrition");
};

exports.delete_entry = function (req, res) {
  var goalTitle = req.params.goalTitle;
  console.log("processing delete_entry controller: ", goalTitle);
  db.deleteEntry(goalTitle);
  res.redirect("/goals");
};

exports.new_entries_lifestyle = function (req, res) {
  res.render("newEntry", {
    title: "Set Lifestyle Goal",
  });
};

exports.post_new_entry_lifestyle = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.goalTitle) {
    response.status(400).send("Entries must have an title.");
    return;
  }
  db.addEntry(
    req.body.goalTitle,
    req.body.description,
    req.body.category,
    req.body.startDate,
    req.body.endDate,
    req.body.complete
  );
  res.redirect("/lifestyle");
};

exports.post_delete_goal = function (req, res) {
  console.log("processing post-delete_goal controller");
  if (!req.query.goalTitle) {
    console.log("IN IF STATEMENT");
    res.status(400).send("Entries must have an Goal Name.");
    return;
  }
  console.log("BEFORE DB ENTRY");
  db.deleteGoal(req.query.goalTitle);
  res.redirect("/fitness");
};
