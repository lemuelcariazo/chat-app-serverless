const { sign, verify, decode } = require("jsonwebtoken");
const User = require("../models/User");
const createJwt = (user) => {
  const { _id } = user;
  const token = sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const validateJWT = async (req, res, next) => {
  try {
    const cookieToken = await req.cookies.jwt;
    const decoded = verify(cookieToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    return next();
  } catch (e) {
    return res.status(403).json({
      message: e,
      error: "Please Login",
    });
  }
}; // need some changes
module.exports = { createJwt, validateJWT };
