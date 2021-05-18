const { gql } = require("apollo-server");

module.exports = gql`
  # Post
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  # User
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
  }
  #
  type Comment {
    id: ID!
    username: String
    body: String!
  }
  #
  type Like {
    id: ID!
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
    getPost(postId: ID!): Post
  }
  # Mutations
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
