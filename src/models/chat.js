const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  usersId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;
