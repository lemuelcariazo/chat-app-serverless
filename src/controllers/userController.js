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
  const decoded = await validateJWT(req);
  const user = await User.findById(decoded._id);
  req.user = user;

  await deleteCookie(res);
  return res.status(200).send("Logout Successfully");
};

const checkLoggedIn = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findOne({
    _id: _id,
  });

  console.log(user.loggedIn);

  if (!user.loggedIn) {
    return res.status(500).send("Internal server Error");
  }

  // find the user first based on the id given by the request

  // to update user after logging in the loggined property will change base on the output

  // loggedIn = true ? loggedIn = false :: viceVersa

  try {
    return next();
  } catch (e) {
    return res.status(500).send("Internal server Error");
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
  checkLoggedIn,
};
