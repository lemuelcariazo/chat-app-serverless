const { findUser, createUser } = require("../helper/findUser");
const { hashPassword, comparePassword } = require("../helper/bcrypt");

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

const handleLogin = async(req, res) => {
  const { email, password, isLogin } = req.body;

  if (!email || !password) {
    return res.status(401).send("Please complete your credential");
  }
  const user = await findUser(email);
  if (user) {
    return res.status(401).send("Username is not valid");
  }


  try {
    const validate = await comparePassword(password)
    
  } catch (error) {
    res.send(error)
  }
  
};

module.exports = { handleRegister, handleLogin };
