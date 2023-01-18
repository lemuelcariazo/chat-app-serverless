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
    email: _email,
    password: _password,
  });

  return _res.status(201).send("New User has been created!");
};
module.exports = { findUser, createUser };
