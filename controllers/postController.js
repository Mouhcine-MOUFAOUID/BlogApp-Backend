const Post = require('../models/post.model')


// This function is for creating a new Post
async function createPost(req, res) {
  const { body } = req;
  if (!body.title || !body.content) {
    console.error("Error Creating a new Post: Missing title or content");
    res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const newPost = await Post.create({
      id: (await Post.countDocuments()) + 1,
      title: body.title,
      content: body.content
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// This one is to get and show all the posts in my db
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// This one show a post based on the id that we give
async function gePostById(req, res) {
  const id = req.params.id;
  try {
    const postId = await Post.findOne({ _id: id });

    if (!postId) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(postId);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}



// This one update the post
async function updatePost(req, res) {
  const { body, params: { id } } = req;

  try {
    const post = await Post.findOne({ _id: id });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!body.title || !body.content) {
      return res.status(400).json({ error: "Please fill the body form" });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          content: body.content
        },
      },
      { new: true }
    );

    console.log("Post updated successfully");
    return res.status(200).json({ message: "Post updated successfully", updatedPost});
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}




// this one delete the selected Post
async function deletePost(req, res) {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ _id: id });

    if (!post) {
      console.log("Post is not in our database");
      return res.status(404).json({ error: "User not found" });
    }

    const deletedpost = await Post.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "Post deleted successfully" });
    console.log("Post was deleted successfully", deletedPost);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  gePostById,
  updatePost,
  deletePost
};
