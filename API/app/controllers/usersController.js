const User = require("../models/users");
const { buildNewUserModel } = require("../utils/utils");
const {
  serverError,
  success,
  notFound,
  conflict,
  deleted,
  created,
  forbidden,
} = require("../utils/status");
const { Op } = require("sequelize");

exports.getSelf = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.user.name },
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
    });
    return res.status(200).json(success(user));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: [
          "password",
          "address",
          "shippingAddress",
          "email",
          "lastName",
          "updatedAt",
        ],
      },
    });
    if (!user) {
      return res.status(404).json(notFound(`user with id '${req.params.idl}'`));
    }
    return res.status(200).json(success(user));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.createOneUser = async (req, res, next) => {
  try {
    const verifyUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (verifyUser) {
      return res
        .status(409)
        .json(conflict(`user with email '${req.body.email}'`));
    }
    try {
      const USER_MODEL = await buildNewUserModel(req.body);
      try {
        const user = await User.create(USER_MODEL);
        return res.status(201).json(created(user));
      } catch (error) {
        return res.status(500).json(serverError(error));
      }
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.deleteOneUser = async (req, res, next) => {
  try {
    const verifyUser = await User.findOne({
      where: { username: req.user.name, id: req.params.id },
    });
    if (!verifyUser) {
      return res
        .status(403)
        .json(forbidden("this account doesn't belong to you."));
    }
    try {
      const user = await User.destroy({
        where: {
          id: req.params.id,
          username: req.user.name,
        },
      });
      return res.status(204).json(deleted(`user '${req.user.name}'`));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.updateOneUser = async (req, res, next) => {
  try {
    const verifyUser = await User.findOne({
      where: { username: req.user.name, id: req.params.id },
    });
    if (!verifyUser) {
      return res
        .status(403)
        .json(forbidden("this account does not belong to you."));
    }
    try {
      const verifyUserEmail = await User.findOne({
        where: { email: req.body.email, id: { [Op.ne]: `${req.params.id}` } },
      });
      if (verifyUserEmail) {
        return res
          .status(409)
          .json(conflict(`user with email${req.body.email} `));
      }
      const USER_MODEL = buildNewUserModel(req.body);
      try {
        const user = await User.update(USER_MODEL, {
          where: {
            id: req.params.id,
            username: req.user.name,
          },
        });
        return res.status(200).json(success(user));
      } catch (error) {
        return res.status(500).json(serverError(error));
      }
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
