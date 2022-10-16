const Saved = require("../models/savedProducts");
const { getUsernameFromId } = require("../utils/userMiddleware");

exports.userGetAllOwn = async (req, res) => {
  try {
    const savedProducts = await Saved.findAll({
      where: {
        owner: req.user.name,
      },
    });
    if (!savedProducts) {
      return res.status(200).json({
        status: "200 - SUCCESS",
        details: "You haven't saved any products yet.",
      });
    }
    return res.status(200).json({
      status: "200 - SUCCESS",
      data: savedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.getAllByUserId = async (req, res) => {
  try {
    const username = await getUsernameFromId(req.params.id);
    try {
      const savedProducts = await Saved.findAll({
        where: {
          owner: username,
        },
      });
      if (!savedProducts) {
        return res.status(200).json({
          status: "200 - SUCCESS",
          details: `User '${username}' hasn't saved any products yet.`,
        });
      }
      return res.status(200).json({
        status: "200 - SUCCESS",
        user: username,
        data: savedProducts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "500 - INTERNAL SERVER ERROR",
        details: error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.getOneSave = async (req, res) => {
  try {
    const savedProduct = await Saved.findOne({
      where: {
        owner: req.user.name,
      },
    });
    if (!savedProduct) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: "Product name not found",
      });
    }
    return res.status(200).json({
      status: "200 - SUCCESS",
      data: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.saveOne = async (req, res) => {
  try {
    const saved = await Saved.findOne({
      where: {
        owner: req.user.name,
        product: req.params.id,
      },
    });
    if (saved) {
      const SAVE_MODEL = {
        owner: req.user.name,
        product: req.params.id,
      };
      try {
        const save = await Saved.create(SAVE_MODEL);
        return res.status(200).json({
          status: "200 - SUCCESS",
          details: "Product successfully saved.",
          data: save,
        });
      } catch (error) {}
    } else {
      return req.status(409).json({
        status: "409 - CONFLICT",
        details: `product already saved.`,
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

exports.deleteOneSave = async (req, res) => {
  try {
    const save = await Saved.destroy({
      where: {
        product: req.params.id,
        owner: req.user.name,
      },
    });
    return res.status(204).json({
      status: "204 - NO CONTENT",
      details: "Successfully removed your saved item",
      data: save,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};
