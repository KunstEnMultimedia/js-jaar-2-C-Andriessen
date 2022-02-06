const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 
        "user" },
    message: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 
      "message" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;