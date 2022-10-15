const { compare, hash } = require("bcrypt");

exports.checkHashedPassword = async (req, res, user) => {
  try {
    const validPassword = await compare(req.body.password, user.password);
    return validPassword;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.hashPassword = async (req, res, next) => {
  try {
    const encryptedPassword = await hash(req.body.password, 10);
    req.body.password = encryptedPassword;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
