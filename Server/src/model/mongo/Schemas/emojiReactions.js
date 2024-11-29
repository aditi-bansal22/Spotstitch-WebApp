const mongoose = require("mongoose");

// Define the schema
const reactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  emoji: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Use `mongoose.models` to avoid overwriting the model
const Reaction = mongoose.models.Reaction || mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
