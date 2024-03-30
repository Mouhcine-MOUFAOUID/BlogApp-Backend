const mongoose = require("./mongodb");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 5,
    unique: true,
  },
  content: {
    type: String,
  },
},
{
  timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
