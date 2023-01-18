const express = require("express");
const router = express.Router();
const { validateJWT } = require("../helper/jwt");

const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/profile", validateJWT, handleProfile);
router.delete("/logout", handleLogout);

module.exports = router;
