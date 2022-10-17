const Product = require("../models/products");
const { serverError, notFound, success } = require("../utils/status");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["cost", "salesPrice"] },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: { exclude: ["cost", "salesPrice"] },
    });
    if (!product) {
      return res
        .status(404)
        .json(notFound(`product with id '${req.params.id}'`));
    }
    return res.status(200).json(success(product));
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
