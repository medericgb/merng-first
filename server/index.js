const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// Dotenv
require("dotenv").config();
const uri = process.env.MONGODB_URI;

// Graphql
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connection to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully !");
    // Running Server
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
