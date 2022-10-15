const User = require("../models/users");
const mw = require("../utils/userMiddleware");

exports.getOne = async (req, res, next) => {
  try {
    await mw.checkUserNull(req, res);
    const user = await User.findOne({
      where: { username: req.user.name },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    await mw.userVerifyExists(req, res);
    let USER_MODEL = mw.buildNewUserModel(req, res);
    const user = await User.create(USER_MODEL);
    return res.status(201).json({ status: "201 - CREATED", user: user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await mw.checkUserNull(req, res);
    const user = await User.destroy({
      where: {
        id: req.params.id,
        username: req.user.name,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    await mw.checkUserNull(req, res);
    const USER_MODEL = mw.buildNewUserModel(req, res);
    const user = await User.update(USER_MODEL, {
      where: {
        id: req.params.id,
        username: req.user.name,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
