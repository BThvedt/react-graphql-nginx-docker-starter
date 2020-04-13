const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const passport = require("passport");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const jwtSecret = "superSecretJwtSecret";
const corsOptions = {
  origin: "http://localhost:3000",
  //origin: "https://coursebuilder.ninja",
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
      console.log(err);
      console.log(typeof err);
      return null;
    }
  }
  return null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    return { req, res, currentUser: await getUser(req.cookies["jwt"]) };
  },
});

server.applyMiddleware({ app, cors: false, path: "/" });

app.listen(80, () => {
  console.log(`Server running at 80`);
});

app.listen(443, () => {
  console.log(`Server running at 443`);
});
