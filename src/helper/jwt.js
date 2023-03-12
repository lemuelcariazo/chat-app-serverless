const { sign, verify, decode } = require("jsonwebtoken");
// const User = require("../models/User");
const createJwt = (user) => {
  const { _id } = user;
  const token = sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  return token;
};

const validateJWT = async (req) => {
  const token = await req.cookies.jwt;
  const decoded = verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = { createJwt, validateJWT };
