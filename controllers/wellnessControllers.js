//Creates the Database that will store the goals of the user
const wellnessDAO = require("../models/wellnessModel");
const db = new wellnessDAO();

//This will display the goals that have been added to give the user an idea of what goals to create
db.init();

//This will display if no gaols have been set by the user
exports.entries_list = function (req, res) {
  res.send("<h1>No Goals set.</h1>");
  db.getAllEntries();
};

//This will display the achievements page
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

//This will display the fitness page
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

//This will display the nutrition page
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

//This will display the lifestyle page
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

//Take user to the create a new fitness goal
exports.new_entries_fitness = function (req, res) {
  res.render("newEntry", {
    title: "Set Fitness Goal",
  });
};

//Posts the user new fitness goal
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

//Take user to the create a new nutrition goal
exports.new_entries_nutrition = function (req, res) {
  res.render("newEntry", {
    title: "Set Nutrition Goal",
  });
};

//Posts the user new nutrition goal
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

//Take user to the create a new lifestyle goal
exports.new_entries_lifestyle = function (req, res) {
  res.render("newEntry", {
    title: "Set Lifestyle Goal",
  });
};

//Posts the user new lifestyle goal
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
