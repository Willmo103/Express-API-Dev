const Saved = require("../models/savedProducts");

exports.getAll = async (req, res) => {
  try {
    const savedProducts = await Saved.findAll({
      where: {
        owner: req.user.name,
      },
    });
    return res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const savedProduct = await Saved.findOne({
      where: {
        owner: req.user.name,
      },
    });
    return res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.saveOne = async (req, res) => {
  try {
    const SAVE_MODEL = {
      owner: req.user.name,
      product: req.body.product,
    };
    const save = await Saved.create(SAVE_MODEL);
    return res.status(200).json({ status: "Product saved.", data: save });
  } catch (error) {
    res.status(500).json(error);
  }
};
