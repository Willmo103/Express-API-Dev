const { compare, hash } = require("bcrypt");

exports.checkHashedPassword = async (reqPassword, storedPassword) => {
  try {
    const validPassword = await compare(reqPassword, storedPassword);
    return validPassword;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.hashPassword = async (password) => {
  try {
    const encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
