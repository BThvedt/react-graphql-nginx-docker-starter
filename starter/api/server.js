const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Hello world!"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: 80 })
  .then(({ url }) => console.log(`Server running at ${url}`));
