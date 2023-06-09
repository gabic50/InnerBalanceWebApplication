//This sets up passport to only let authorized users to gain access to the web application
//Stores users account locally on the database
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

//Verifies the users email and password match the authorized user in the database
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new localStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.serializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
