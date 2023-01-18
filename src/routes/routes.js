const express = require("express");
const router = express.Router();

const {
  handleRegister,
  handleLogin,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.post("/login", handleLogin);

module.exports = router;
