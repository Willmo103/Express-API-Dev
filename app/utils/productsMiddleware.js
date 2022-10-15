const Product = require("../models/products");

exports.checkProductNull = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        reason: `product with id: ${req.params.id} does not exist.`,
      });
    }
    next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.productVerifyExists = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { name: req.body.name },
    });
    if (product) {
      return res.status(409).json({
        status: "409 - CONFLICT",
        reason: `product with id: ${req.body.name} already exists.`,
      });
    }
    next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.buildProductModel = (req, res, next) => {
  try {
    const PRODUCT_MODEL = {
      name: req.body.name,
      price: req.body.price,
      cost: req.body.cost,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      quantity: req.body.quantity,
    };
    return PRODUCT_MODEL, next;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
