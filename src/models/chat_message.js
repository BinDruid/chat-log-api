const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  chatDate: {
    type: String,
    default: () => new Date().toLocaleDateString(),
    immutable: true,
  },
  chatTime: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
    immutable: true,
  },
  userName: String,
  message: String,
  userID: Number,
  moderator: Boolean,
  subscriber: Boolean,
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
