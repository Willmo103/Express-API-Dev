const Product = require("../../models/products");
const mw = require("../../utils/productsMiddleware");

exports.updateOne = async (req, res) => {
  try {
    await wm.checkProductNull(req, res);
    const PRODUCT_MODEL = mw.buildProductModel(req, res);
    try {
      const product = await Product.update(PRODUCT_MODEL, {
        where: { id: req.params.id },
      });
      return res.status(200).json({ status: "product updated", data: product });
    } catch (error) {}
    console.log(error);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    await wm.checkProductNull(req, res);
    try {
      await Product.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ status: "product deleted" });
    } catch (error) {}
    console.log(error);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res) => {
  try {
    await mw.productVerifyExists(req, res);
    const PRODUCT_MODEL = await mw.buildProductModel(req, res);
    try {
      const product = await Product.create(PRODUCT_MODEL);
      return res.status(200).json({ status: "product saved", data: product });
    } catch (error) {}
    console.log(error);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
