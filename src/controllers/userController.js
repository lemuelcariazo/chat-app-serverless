const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { findUser, createUser } = require("../helper/findUser");
const { deleteCookie } = require("../helper/cookie");
const emailValidator = require("email-validator");

const User = require("../models/User");
const UserLog = require("../models/UserLog");

const handleRegister = async (req, res) => {
  const { email, password, loggedIn } = req.body;

  const validated = emailValidator.validate(email);
  console.log(validated);

  if (!email || !password) {
    return res.status(401).send("Please provide your credential");
  }

  if (validated) {
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
  } else {
    return res.status(500).send("Email is not Valid");
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
  const { _id, email, loggedIn, username } = req.user;
  try {
    return res.json({
      id: _id,
      email: email,
      loggedIn: loggedIn,
      username: username,
    });
  } catch (e) {
    return res.send(e);
  }
};

const handleLogout = async (req, res) => {
  try {
    await deleteCookie(res);
    return res.status(200).send("Logout Successfully");
  } catch (e) {
    res.status(500).send("Internal server error", e);
  }
};

const catchIdAndUpdate = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id: _id });

  user.loggedIn = false;
  user.save();
  return next();
};

const checkLoggedIn = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findOne({
    _id: _id,
  });

  if (!user.loggedIn) {
    return res.status(500).send("Internal server Error");
  }

  try {
    return next();
  } catch (e) {
    return res.status(500).send("Internal server Error");
  }
};

const saveUserLogs = async (req, res, next) => {
  const { method, url, ip } = req;
  const timestamp = new Date().toISOString();
  try {
    const userId = req.user._id;
    await UserLog.create({
      user: userId,
      ipAddress: ip,
      timestamp: timestamp,
    });
    return next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleProfile,
  catchIdAndUpdate,
  checkLoggedIn,
  saveUserLogs,
};
