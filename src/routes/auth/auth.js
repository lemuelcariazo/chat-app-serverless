const { comparePassword } = require("../../helper/bcrypt");
const { findUser } = require("../../helper/findUser");
const { saveCookie } = require("../../helper/cookie");
const { validateJWT } = require("../../helper/jwt");
const { createJwt } = require("../../helper/jwt");
const emailValidator = require("email-validator");

const User = require("../../models/User");

const authentication = async (req, res, next) => {
  // to verify the user if he is human or legitimate user
  const { email, password, isLogin } = req.body;
  const validated = emailValidator.validate(email);
  console.log(validated);

  if (!email || !password) {
    return res.status(401).send("Please complete your credential");
  }

  if (validated) {
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
      console.log(user.loggedIn);
      await user.save();
      return next();
    } catch (e) {
      return res.status(401).send(e);
    }
  } else {
    return res.status(500).send("Email is not Valid");
  }
};

const authorization = async (req, res, next) => {
  // to limit the user what data he/she wants
  try {
    const decoded = await validateJWT(req);
    const user = await User.findById(decoded._id);
    req.user = user;

    return next();
  } catch (e) {
    return res.status(403).json({
      message: e,
      error: "Please Login",
    });
  }
};

module.exports = { authentication, authorization };
