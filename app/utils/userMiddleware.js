const User = require("../models/users");
const utils = require("../utils/utils");

exports.checkUserNull = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        reason: `user with id: ${req.params.id} does not exist.`,
      });
    }
    return;
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.userVerifyExists = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { name: req.body.name },
    });
    if (user) {
      return res.status(409).json({
        status: "409 - CONFLICT",
        reason: `user with id: ${req.body.name} already exists.`,
      });
    }
    return;
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.buildNewUserModel = async (req, res) => {
  try {
    const hashedPassword = await utils.hashPassword(req, res);
    const USER_MODEL = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      shippingAddress: req.body.shippingAddress,
    };
    return USER_MODEL;
  } catch (error) {
    return res.status(500).json(error);
  }
};
