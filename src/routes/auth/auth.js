const { comparePassword } = require("../../helper/bcrypt");
const { findUser } = require("../../helper/findUser");
const { saveCookie } = require("../../helper/cookie");
const { validateJWT } = require("../../helper/jwt");
const { createJwt } = require("../../helper/jwt");

const User = require("../../models/User");

const authentication = async (req, res, next) => {
  // to verify the user if he is human or legitimate user
  const { email, password, isLogin } = req.body;

  if (!email || !password) {
    return res.status(401).send("Please complete your credential");
  }
  const user = await findUser(email);
  if (!user) {
    return res.status(401).send("Username and Password is not valid");
  }

  const hashPassword = user.password;
  const comparePwd = await comparePassword(password, hashPassword);
  if (!comparePwd) {
    return res.status(401).send("Username and Password is not valid!");
  }

  try {
    const token = createJwt(user); // create jwt token
    saveCookie(token, res); // store token in http only cookie
    user.loggedIn = true;
    await user.save();
    return next();
  } catch (e) {
    return res.status(401).send(e);
  }
};

const authorization = async (req, res, next) => {
  // to limit the user what data he/she wants
  try {
    const decoded = await validateJWT(req);
    const user = await User.findById(decoded._id);
    req.user = user;

    const { _id } = req.user;
    console.log(_id);

    return next();
  } catch (e) {
    return res.status(403).json({
      message: e,
      error: "Please Login",
    });
  }
};

module.exports = { authentication, authorization };
