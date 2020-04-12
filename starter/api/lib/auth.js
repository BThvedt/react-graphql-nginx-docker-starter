const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fakeDB = require("./fakedb.js");

const jwtSecret = "superSecretJwtSecret";

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // faking a DB. In real life this would find a user from the database

    const user = fakeDB.getUsers().filter((u) => u.email === email)[0];

    if (!user) {
      return done(null, false, "Invalid email");
    }

    // of course in real life this should be encrypted in the database
    if (password !== user.password) {
      return done(null, false, "Invalid Password");
    }

    return done(null, user);
  })
);

/*
Kinda weird .. following the 'custom callback' pattern from the passport docs
of course the authenticat method wants to get called by 'req' assuming it's been 
parsed by bodyparser or somethign.. so it can be faked with the {body: {email, password}}
object. Then we return a promise so it can be used in a graphql resolver
*/
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (!user) {
        reject("Invalid credentials.");
      }

      try {
        req.login(user, { session: false }, (err) => {
          if (err) {
            reject(err);
          }
          return resolve(user);
        });
      } catch (err) {
        reject(err);
      }
    })({ body: { email, password } });
  });
}

module.exports = { login };
