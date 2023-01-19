const express = require("express");
const router = express.Router();
// const { validateJWT } = require("../helper/jwt");
const { authentiction, authorization } = require("./auth/auth");

const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.post("/login", authentiction, handleLogin);
router.get("/profile", authorization, handleProfile);
router.delete("/logout", handleLogout);

module.exports = router;
