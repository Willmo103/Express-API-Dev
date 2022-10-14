const Product = require("../models/products");

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Product.findAll({
      attributes: { exclude: ["cost"] },
    });
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: { exclude: ["cost"] },
    });
    if (!product) {
      return res.status(404).json({
        status: "failed",
        reason: `product with id: ${req.params.id} does not exist.`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
