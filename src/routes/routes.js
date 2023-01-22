const express = require("express");
const router = express.Router();
const { authentication, authorization } = require("./auth/auth");

const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
  checkLoggedIn,
} = require("../controllers/userController");

router.post("/register", handleRegister);
router.post("/login", authentication, handleLogin);
router.get("/profile", authorization, checkLoggedIn, handleProfile);
router.delete("/logout", handleLogout);
// router.put("/update/:63ca9651a47e17fe7148aff0", handleUpdates);

router.get("/", (__, res) => {
  res.send("It is working fine");
});

module.exports = router;
