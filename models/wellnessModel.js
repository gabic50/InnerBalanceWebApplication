//Create the wellness database
const nedb = require("nedb");
class WellnessGoals {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }
  //Goals pre set to give users ideas of goals to set
  init() {
    this.db.insert([
      {
        goalTitle: "Exercise 60 mins a week",
        description: "Exercise 3 times a week for 20 mins",
        published: "2023-04-20",
        category: "Fitness",
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        complete: "",
      },
      {
        goalTitle: "Eat five fruit and veg a day",
        description:
          "Have two pieces of fruit in the morning. An apple at lunch time. Dessert raspberries and blueberries",
        published: "2023-04-23",
        category: "Nutrition",
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        complete: "",
      },
      {
        goalTitle: "8 hours sleep a night",
        description: "Be in bed for 10pm every night",
        published: "2023-04-21",
        category: "Lifestyle",
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        complete: "",
      },
      {
        name: "admin",
        email: "admin@admin",
        password: "admin",
      },
    ]);
  }

  //Function to return all goals from the database
  getAllEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({}, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  //Function to return all completed goals from the database
  getAllCompletedEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({ complete: "completed" }, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  //Function to return all fitness goals from the database
  getAllFitnessEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({ category: "Fitness" }, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  //Function to return all nutrition goals from the database
  getAllNutritionEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({ category: "Nutrition" }, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  //Function to return all lifestyle goals from the database
  getAllLifestyleEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({ category: "Lifestyle" }, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  //Adds new goals into the database
  addEntry(goalTitle, description, category, startDate, endDate, complete) {
    var entry = {
      goalTitle: goalTitle,
      description: description,
      category: category,
      startDate: startDate,
      endDate: endDate,
      complete: complete,
      published: new Date().toISOString().split("T")[0],
    };
    console.log("entry created", entry);
    this.db.insert(entry, function (err, doc) {
      if (err) {
        console.log("Error inserting document", goalTitle);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }
}

//make the module visible outside
module.exports = WellnessGoals;
