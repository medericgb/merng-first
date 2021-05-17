const { gql } = require("apollo-server");

module.exports = gql`
  # Post
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  # User
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
  }
  #
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  # All Queries
  type Query {
    getPosts: [Post]
  }
  # Mutations
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
