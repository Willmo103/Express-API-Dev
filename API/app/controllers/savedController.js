const Product = require("../models/products");
const Saved = require("../models/savedProducts");
const {
  serverError,
  empty,
  success,
  notFound,
  conflict,
  deleted,
  created,
} = require("../utils/status");
const { getUsernameFromId } = require("../utils/utils");

exports.userGetAllOwn = async (req, res) => {
  try {
    const savedProducts = await Saved.findAll({
      where: {
        owner: req.user.name,
      },
    });
    if (!savedProducts) {
      return res.status(200).json(empty("products"));
    }
    return res.status(200).json(success(savedProducts));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.getAllByUserId = async (req, res) => {
  try {
    const username = await getUsernameFromId(req.params.id);
    if (!username) {
      return res.status(404).json(notFound(`user with '${req.params.id}'`))
    }
    try {
      const savedProducts = await Saved.findAll({
        where: {
          owner: username,
        },
      });
      if (!savedProducts) {
        return res.status(200).json(empty(savedProducts));
      }
      return res.status(200).json(success(savedProducts));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
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
      return res.status(404).json(notFound(`saved product`));
    }
    return res.status(200).json(success(savedProduct));
  } catch (error) {
    return res.status(500).json(serverError(error));
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
      return res.status(409).json(conflict("saved product"));
    }
    try {
      const product = Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) {
        return res.status(404).json(notFound("saved product"));
      }
      const SAVE_MODEL = {
        owner: req.user.name,
        product: req.params.id,
      };
      try {
        const save = await Saved.create(SAVE_MODEL);
        return res.status(201).json(created(save));
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

exports.deleteOneSave = async (req, res) => {
  try {
    const save = await Saved.findOne({
      where: {
        product: req.params.id,
        owner: req.user.name,
      },
    });
    if (!save) return res.status(404).json(notFound("saved product"));
    try {
      const deleteSave = await Saved.destroy({
        where: {
          product: req.params.id,
          owner: req.user.name,
        },
      });
      return res.status(204).json(deleted("saved product"));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
