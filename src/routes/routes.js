const express = require("express");
const router = express.Router();
const { authentication, authorization } = require("./auth/auth");
const { updateUser } = require("../helper/findUser");

const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.post("/login", authentication, handleLogin);
router.get("/profile", authorization, updateUser, handleProfile);
router.delete("/logout", handleLogout);
router.get("/", (__, res) => {
  res.send("It is working fine");
});

module.exports = router;
