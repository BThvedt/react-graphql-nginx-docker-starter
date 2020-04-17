const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwtSecret = "superSecretJwtSecret";

console.log(process.env.NODE_ENV);
console.log(process.env);

let enforceCors = true;
let useCookie = true;
let whitelist;

if (process.env.NODE_ENV != "local" && process.env.NODE_ENV != "production") {
  enforceCors = false;
  useCookie = false;
} else {
  enforceCors = true;
  whitelist = [
    `http://${process.env.FOOAPP_URL}`,
    `http://${process.env.BARAPP_URL}`,
    `http://${process.env.API_URL}`,
  ];
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!enforceCors || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // <-- REQUIRED backend setting
};

// Express for middleware goodness, and passport for auth
const app = express();
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(cookieParser());

// Typedefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

// Decided not to use passport for JWT, might use it for other login schemes though in the future?
const getUser = async (token) => {
  if (token) {
    try {
      let result = await jwt.verify(token, jwtSecret);
      return result;
    } catch (err) {
      // return null user or maybe throw error (apollo server has a AuthenticationError)
      return null;
    }
  }
  return null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    if (useCookie) {
      return { req, res, currentUser: await getUser(req.cookies["jwt"]) };
    } else {
      return {
        req,
        res,
        currentUser: await getUser(req.headers["authorization"]),
      };
    }
  },
});

// server has it's own idea of 'cors' .. make sure it doesn't get in the way of more desired cors settings
server.applyMiddleware({ app, cors: false, path: "/" });

if (
  process.env.NODE_ENV === "local" ||
  (process.env.NODE_ENV === "production" && process.env.HTTPS !== "true")
) {
  app.listen(80, () => {
    console.log(`Server running at 80`);
  });
} else if (
  process.env.NODE_ENV === "production" &&
  process.env.HTTPS === "true"
) {
  app.listen(443, () => {
    console.log(`Server running at 443`);
  });
} else {
  // dev environment
  app.listen(9000, () => {
    console.log(`Server running at 9000`);
  });
}
