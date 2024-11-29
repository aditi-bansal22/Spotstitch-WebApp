const mongoose = require("mongoose");
const { updateFields } = require("./validateFields");
const Reaction = require("./emojiReactions");  // Import the Reaction model

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  // username: String, // We do not want to keep username, difficult to update
  // see getAllPosts.js, we fetch username and avatar there

  userDescription: String,
  image: {
    data: String,
    contentType: String,
  },
  description: String,
  tags: [String],
  comments: [
    {
      by: String,
      content: String,
      likes: Number,
    },
  ],
  likes: Number,
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",  // Reference to the Reaction model
    },
  ],  // Add the reactions field to store reactions for this post
});

// Method to get reactions for a specific post
PostSchema.statics.getReactions = async function (postId) {
  try {
    const reactions = await Reaction.find({ postId: postId });
    return reactions;
  } catch (err) {
    throw new Error("Error getting reactions for post");
  }
};

// Method to get all posts
PostSchema.statics.getAllPosts = async () => {
  try {
    const result = await Post.find();
    return result;
  } catch (err) {
    throw new Error("Error getting all posts");
  }
};

// Method to get a single post by ID
PostSchema.statics.getPost = async (id) => {
  try {
    const result = await Post.findById(id);
    return result;
  } catch (err) {
    throw new Error("Error getting post by ID");
  }
};

// Method to get posts by userId (username)
PostSchema.statics.getPostUsername = async function (userId) {
    try {
        const result = await Post.find({ userId: userId });
        return result;
    } catch (err) {
        throw new Error("Error getting posts by username: " + err.message);
    }
};

// Method to get posts by tags
PostSchema.statics.getPosts = async (filters = "") => {
  try {
    const result = await Post.find({ tags: { $all: filters } });
    return result;
  } catch (err) {
    throw new Error("Error getting posts with specific tags");
  }
};

// Method to create a post
PostSchema.statics.createPost = async (postData) => {
  try {
    const post = new Post(postData);
    await post.save();
    return post;
  } catch (err) {
    throw new Error("Error creating post");
  }
};

// Method to update the post's image
PostSchema.methods.updateImage = async function (newImg) {
  try {
    this.image = newImg;
    await this.save();
  } catch (err) {
    throw new Error(err);
  }
};

// Method to update the post
PostSchema.methods.updatePost = async function (post) {
  try {
    updateFields(this, post);
    await this.save();
  } catch (err) {
    throw new Error(err);
  }
};

// Method to add a comment to the post
PostSchema.methods.addComment = async function (userId, comment) {
  try {
    const post = {
      by: userId,
      content: comment,
      likes: 0,
    };
    this.comments.push(post);
    await this.save();
    return this;
  } catch (err) {
    throw new Error(err);
  }
};

// Method to delete the post
PostSchema.methods.deletePost = async function () {
  try {
    await this.delete();
  } catch (err) {
    throw new Error(err);
  }
};

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
