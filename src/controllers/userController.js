const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { findUser, createUser } = require("../helper/findUser");
const { saveCookie, deleteCookie } = require("../helper/cookie");

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
  // const { email, password, isLogin } = req.body;

  // if (!email || !password) {
  //   return res.status(401).send("Please complete your credential");
  // }
  // const user = await findUser(email);
  // if (!user) {
  //   return res.status(401).send("Username and Password is not valid");
  // }

  // const hashPassword = user.password;
  // const comparePwd = await comparePassword(password, hashPassword);
  // if (!comparePwd) {
  //   return res.status(401).send("Username and Password is not valid!");
  // }

  // const token = createJwt(user); // create jwt token
  // saveCookie(token, res); // store token in http only cookie

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
