const Product = require("../../models/products");
const { buildProductModel } = require("../../utils/utils");
const {
  serverError,
  success,
  notFound,
  conflict,
  deleted,
  created,
} = require("../../utils/status");

exports.updateOne = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json(notFound("product"));
    }
    const PRODUCT_MODEL = buildProductModel(req.body);
    try {
      const product = await Product.update(PRODUCT_MODEL, {
        where: { id: req.params.id },
      });
      return res.status(200).json(success(product));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json(notFound("product"));
    }
    try {
      await Product.destroy({ where: { id: req.params.id } });
      return res.status(204).json(deleted("product"));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};

exports.createOne = async (req, res) => {
  try {
    const verifyProduct = await Product.findOne({
      where: { name: req.body.name },
    });
    if (verifyProduct) {
      return res.status(409).json(conflict("product"));
    }
    const PRODUCT_MODEL = buildProductModel(req.body);
    try {
      const product = await Product.create(PRODUCT_MODEL);
      return res.status(201).json(created(product));
    } catch (error) {
      return res.status(500).json(serverError(error));
    }
  } catch (error) {
    return res.status(500).json(serverError(error));
  }
};
