const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/post.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    // Get all post from DB
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    // Get single post by ID
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    // createPost
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);

      const newPost = new Post({
        body,
        user: user.indexOf,
        username: user.username,
      });

      const post = await newPost.save();
      return post;
    },
    // deletePost
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
