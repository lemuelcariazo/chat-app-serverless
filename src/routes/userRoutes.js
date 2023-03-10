const express = require("express");
const router = express.Router();
const { findUser } = require("../helper/findUser");
const User = require("../models/User");
const { authentication, authorization } = require("./auth/auth");
const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
  checkLoggedIn,
  catchIdAndUpdate,
  saveUserLogs,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.post("/login", authentication, saveUserLogs, handleLogin);
router.get("/profile", authorization, checkLoggedIn, handleProfile);
router.delete("/logout", authorization, catchIdAndUpdate, handleLogout);

router.get("/", (__, res) => {
  res.send("It is working fine");
});

// finding a friend in a mock api
router.post("/findUser", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("No user found");
  }
  try {
    return res.send(user.email);
  } catch (e) {
    return res.send(e);
  }
});

router.get("chatRoom", (req, res) => {});

module.exports = router;
