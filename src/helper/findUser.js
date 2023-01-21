const User = require("../models/User");

const findUser = async (email) => {
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return user;
  } else {
    return null;
  }
};

const createUser = async (_email, _password, _res) => {
  await User.create({
    username: "",
    email: _email,
    password: _password,
    loggedIn: false,
  });

  return _res.status(201).send("New User has been created!");
};

const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({
      _id: _id,
    });

    const { loggedIn } = user;

    if (loggedIn) {
      return (user.loggedIn = false);
    }
    console.log(user);
    user.loggedIn = true;
    await user.save();

    return next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { findUser, createUser, updateUser };
