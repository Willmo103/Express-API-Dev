const Product = require("../models/products");
const mw = require("../utils/productsMiddleware");

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Product.findAll({
      attributes: { exclude: ["cost", "salesPrice"] },
    });
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    await mw.checkProductNull(req, res);
    const product = await Product.findByPk(req.params.id, {
      attributes: { exclude: ["cost", "salesPrice"] },
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
