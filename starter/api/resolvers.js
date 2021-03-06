const AuthService = require("./lib/auth");
const jwt = require("jsonwebtoken");
const jwtSecret = "superSecretJwtSecret";
const fakeDB = require("./lib/fakedb");
const { DEFAULT_USER } = require("./lib/defaults.js");
const randomstring = require("randomstring");

// add what you want to the token here
const createToken = (user, secret, expiresIn) => {
  const { id, username, email, roles } = user;
  return jwt.sign({ id, username, email, roles }, secret, { expiresIn });
};

const authenticateByRole = (role) => (next) => (root, args, context, info) => {
  // if you implement permissions per role, a similar function could be used
  // there could be a way to do this with graphql directives and modules but I haven't done it yet
  // https://medium.com/the-guild/authentication-and-authorization-in-graphql-and-how-graphql-modules-can-help-fadc1ee5b0c2
  if (
    context.currentUser &&
    context.currentUser.roles &&
    !context.currentUser.roles.includes(role)
  ) {
    throw new Error("Unauthorized!");
  }

  return next(root, args, context, info);
};

module.exports = {
  Query: {
    helloWorld: () => "Hello world!",
    getCurrentUser: (_, args, { req, currentUser }) => {
      var Today = new Date();
      return currentUser || DEFAULT_USER;
    },
    getEmail: (_, args, { currentUser }) =>
      currentUser ? currentUser.email : null,
    protectedQuery: authenticateByRole("foouser")(
      (root, args, context) =>
        "Only users with role Foouser will get this result back from the server"
    ),
    protectedBarQuery: authenticateByRole("baruser")((root, args, context) => {
      return "Only users with role Baruser will get this result back from the server";
    }),
  },
  SigninResult: {
    __resolveType(obj, context, info) {
      if (
        process.env.NODE_ENV !== "local" &&
        process.env.NODE_ENV !== "production"
      ) {
        return "Token";
      } else {
        return "User";
      }
    },
  },
  Mutation: {
    signin: async (_, { email, password }, { req, res }) => {
      try {
        const user = await AuthService.login({ email, password, req });
        if (
          process.env.NODE_ENV !== "local" &&
          process.env.NODE_ENV !== "production"
        ) {
          return { token: createToken(user, jwtSecret, "1hr") };
        } else {
          const token = createToken(user, jwtSecret, "1hr");
          res.cookie("jwt", token, {
            httpOnly: true,
          });

          return user || DEFAULT_USER;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // User is destructured from context passed to apollo server
    signup: async (_, { username, email, password }) => {
      const user = fakeDB.getUsers().filter((u) => u.email === email)[0];

      if (user) {
        throw new Error("User already exists");
      }

      // hash the password and save user to the DB
      // const newUser = await "hash password & save user to db here & stuff"
      // return a token;
      throw new Error("Singnup not implemented yet");
    },

    signout: (_, args, { res }) => {
      const randNum = Math.floor(Math.random() * 14 + 10);
      const newCookie = jwt.sign(
        randomstring.generate(randNum),
        jwtSecret,
        null
      );
      res.cookie("jwt", newCookie, {
        httpOnly: true,
        secure:
          process.env.HTTPS === "true" &&
          (process.env.NODE_ENV === "production" ||
            process.env.NODE_ENV === "local"),
      });

      return true;
    },
  },
};
