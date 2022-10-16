const User = require("../models/users");
const {
  checkUserNull,
  userVerifyExists,
  buildNewUserModel,
} = require("../utils/userMiddleware");
const hashPassword = require("../utils/utils").hashPassword;

exports.getSelf = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.user.name },
    });
    if (!user) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `user with username '${req.params.name}' does not exist.`,
      });
    }
    return res.status(200).json({ status: "200 - SUCCESS", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
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
        ],
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `user with id: '${id}' does not exist.`,
      });
    }
    return res.status(200).json({ status: "200 - SUCCESS", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.createOneUser = async (req, res, next) => {
  try {
    if (await userVerifyExists(req.body.email)) {
      try {
        const USER_MODEL = await buildNewUserModel(req.body);
        try {
          const user = await User.create(USER_MODEL);
          return res.status(201).json({
            status: "201 - CREATED",
            details: "User created",
            data: user,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            status: "500 - INTERNAL SERVER ERROR",
            details: error,
          });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "500 - INTERNAL SERVER ERROR",
          details: error,
        });
      }
    } else {
      return res.status(409).json({
        status: "409 - CONFLICT",
        details: `user with email: '${req.body.email}' already exists. please login.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.deleteOneUser = async (req, res, next) => {
  try {
    if (await checkUserNull(req.params.id)) {
      try {
        const user = await User.destroy({
          where: {
            id: req.params.id,
            username: req.user.name,
          },
        });
        return res.status(204).json({
          Status: "204 - NO CONTENT",
          details: "User successfully deleted.",
          data: user,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "500 - INTERNAL SERVER ERROR",
          details: error,
        });
      }
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `user with id: '${id}' does not exist.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.updateOneUser = async (req, res, next) => {
  try {
    if (await checkUserNull(req.id)) {
      const USER_MODEL = buildNewUserModel(req.body);
      try {
        const user = await User.update(USER_MODEL, {
          where: {
            id: req.params.id,
            username: req.user.name,
          },
        });
        return res.status(200).json({
          status: "200 - SUCCESS",
          details: `User successfully updated`,
          data: user,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "500 - INTERNAL SERVER ERROR",
          details: error,
        });
      }
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `user with id: ${req.params.id} does not exist.`,
      });
    }
    console.log(error);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};
