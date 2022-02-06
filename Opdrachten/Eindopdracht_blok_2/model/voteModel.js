const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    like : { type: Boolean, required: true },
    dislike : { type: Boolean, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 
        "user" },
    message: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 
      "message" },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;