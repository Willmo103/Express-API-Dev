const User = require("../models/users");
const utils = require("../utils/utils");

exports.checkUserNull = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        reason: `user with id: ${req.params.id} does not exist.`,
      });
    }
    next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.userVerifyExists = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      return res.status(409).json({
        status: "409 - CONFLICT",
        reason: `user with id: ${req.body.name} already exists.`,
      });
    }
    next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.buildNewUserModel = async (req, res, next) => {
  try {
    await utils.hashPassword(req, res, next);
    const USER_MODEL = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      shippingAddress: req.body.shippingAddress,
      bio: req.body.bio,
      subtitle: req.body.subtitle,
    };
    req.body["userModel"] = USER_MODEL;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getUserTokenId = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.user.name,
      },
    });
    return user.id;
  } catch (error) {
    console.log(error);
    res.send(500).json(error);
  }
};

exports.getUsernameFromId = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    return user.username;
  } catch (error) {
    console.log(error);
    res.send(500).json(error);
  }
};

// exports.getUserIdFromPath = async (req, rex){
//   try {
//     const user = await User.findOne({
//       where: {
//         : req.user.name,
//       },
//     });
//     return user.id;
//   } catch (error) {
//     res.send(500).json(error);
//   }
// }
