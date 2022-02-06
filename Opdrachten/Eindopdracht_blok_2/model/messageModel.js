const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 
      "user" },
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("message", messageSchema);

module.exports = Message;