const mongoose = require("mongoose");

const UserLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ipAddress: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserLog = mongoose.model("UserLog", UserLogSchema);

module.exports = UserLog;
