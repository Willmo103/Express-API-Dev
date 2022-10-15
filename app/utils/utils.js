const { compare } = require("bcrypt");
const { User } = require("../models/users");
exports.getId = (user) => {
  const id = user ? user.email : user.password;
  return id;
};

exports.getLogInMethod = (req, res) => {
  if (req.body.email) {
    return "email";
  } else if (req.body.username) {
    return "username";
  } else if ((!user.password && !user.email) || !user.password) {
    return res.status(400).json({
      status: "400 - BAD REQUEST",
      reason: "Invalid credentials.",
    });
  }
};

exports.checkHashedPassword = async (req, res, user) => {
  try {
    const validPassword = await compare(req.body.password, user.password);
    return validPassword;
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.hashPassword = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    return encryptedPassword;
  } catch (error) {
    return res.status(400).json({
      status: "400 - BAD REQUEST",
      reason: "Password Unhashable.",
    });
  }
};

exports.createToken = async(email);
