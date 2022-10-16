const User = require("../models/users");
const utils = require("../utils/utils");

exports.checkUserNull = async (id = 0) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};
exports.userVerifyExists = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.buildNewUserModel = async (body = {}) => {
  try {
    const hashed = await utils.hashPassword(body.password);
    const USER_MODEL = {
      username: body.username,
      email: body.email,
      password: hashed,
      firstName: body.firstName,
      lastName: body.lastName,
      address: body.address,
      shippingAddress: body.shippingAddress,
      bio: body.bio,
      subtitle: body.subtitle,
    };
    return USER_MODEL;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.getUserTokenId = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    return user.id;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.getUsernameFromId = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return user.username;
  } catch (error) {
    console.log(error);
    return;
  }
};
