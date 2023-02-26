const express = require("express");
const router = express.Router();
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

module.exports = router;
