const User = require("../../models/users");
const { serverError, success, empty } = require("../../utils/status");

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    if (!users) {
      return res.status(200).json(empty(users));
    }
    return res.status(200).json(success(users));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
