const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    sayHello: String!
  }
`;

const resolvers = {
  Query: {
    sayHello: () => "Hello world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Ruuning Server
server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
