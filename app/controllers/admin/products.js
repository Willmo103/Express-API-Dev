const Product = require("../../models/products");
const utils = require("../../utils");
const mw = require("../../utils/productsMiddleware");

exports.updateOne = async (req, res, next) => {
  try {
    await wm.checkProductNull(req, res);
    const PRODUCT_MODEL = mw.buildProductModel(req, res);
    const product = await Product.update(PRODUCT_MODEL, {
      where: { id: req.params.id },
    });
    return res.status(200).json({ status: "product updated", data: product });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    await wm.checkProductNull(req, res);
    await Product.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ status: "product deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    await mw.productVerifyExists(req, res);
    const PRODUCT_MODEL = await mw.buildProductModel(req, res);
    try {
      const product = await Product.create(PRODUCT_MODEL);
      return res.status(200).json({ status: "product saved", data: product });
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
