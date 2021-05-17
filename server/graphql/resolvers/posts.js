const Post = require("../../models/post.model");

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
  },
};
