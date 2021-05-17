const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    username: String,
    body: String,
    comments: [
      {
        body: String,
        username: String,
      },
      { timestamps: true },
    ],
    likes: [{ username: String }, { timestamps: true }],
    user: {
      type: Schema.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
