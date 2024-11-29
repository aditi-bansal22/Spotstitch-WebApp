const express = require("express");
const mongoose = require("mongoose");
const Reaction = require("../../model/mongo/Schemas/emojiReactions");

const router = express.Router();

// Route to add or remove an emoji reaction
router.post("/add", async (req, res) => {
  const { username, post, emoji } = req.body;

  // Validate request body
  if (!username || !post) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: username and post are mandatory",
    });
  }

  try {
    if (emoji === "") {
      // Remove the reaction if the emoji is an empty string
      const reaction = await Reaction.findOneAndDelete({
        username: username,
        post: mongoose.Types.ObjectId(post),
      });

      if (!reaction) {
        return res.status(404).json({
          success: false,
          error: "Reaction not found for this user and post",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Reaction removed successfully",
      });
    }

    // Add or update the reaction
    const existingReaction = await Reaction.findOne({
      username: username,
      post: mongoose.Types.ObjectId(post),
    });

    if (existingReaction) {
      // Update the existing reaction
      existingReaction.emoji = emoji;
      existingReaction.timestamp = new Date(); // Update the timestamp
      await existingReaction.save();
    } else {
      // Create a new reaction
      const reactionData = {
        username,
        post: mongoose.Types.ObjectId(post), // Ensure post ID is an ObjectId
        emoji,
        timestamp: new Date(), // Capture the current timestamp
      };

      const reaction = new Reaction(reactionData);
      await reaction.save();
    }

    // Fetch updated list of reactions for the post
    const reactions = await Reaction.find({ post: mongoose.Types.ObjectId(post) });

    return res.status(201).json({
      success: true,
      message: "Reaction added/updated successfully",
      reactions, // Return all reactions for this post
    });
  } catch (err) {
    console.error("Error processing reaction:", err);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error: Unable to process reaction",
    });
  }
});

module.exports = router;
