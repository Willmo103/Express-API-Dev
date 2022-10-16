const Product = require("../models/products");
const mw = require("../utils/productsMiddleware");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["cost", "salesPrice"] },
    });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: { exclude: ["cost", "salesPrice"] },
    });
    if (!product) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        reason: `product with id: ${req.params.id} does not exist.`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};
