const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { findUser, createUser } = require("../helper/findUser");
const { deleteCookie } = require("../helper/cookie");
const User = require("../models/User");
const { send } = require("vite");

const handleRegister = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("Please provide your credential");
  }
  const user = await findUser(email);
  if (user) {
    return res.status(401).send("Username already taken");
  }

  try {
    const hashedPwd = await hashPassword(password, 10);
    const response = await createUser(email, hashedPwd, res);
    return response;
  } catch (error) {
    res.send(error);
  }
};

const handleLogin = async (req, res) => {
  try {
    return res.send("Login Successfully");
  } catch (error) {
    res.send(error);
  }
};

const handleProfile = async (req, res) => {
  const { _id, email } = req.user;

  try {
    return res.json({
      id: _id,
      email: email,
    });
  } catch (e) {
    return res.send(e);
  }
};

const handleLogout = async (__, res) => {
  await deleteCookie(res);
  return res.status(200).send("Logout Successfully");
};

module.exports = { handleRegister, handleLogin, handleLogout, handleProfile };
