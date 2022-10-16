const User = require("../../models/users");

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return res.status(200).json({
      status: "200 - SUCCESS",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};
