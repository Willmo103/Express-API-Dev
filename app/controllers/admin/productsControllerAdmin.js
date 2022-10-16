const Product = require("../../models/products");
const {
  buildProductModel,
  productVerifyExists,
  checkProductNull,
} = require("../../utils/productsMiddleware");

exports.updateOne = async (req, res) => {
  try {
    if (await checkProductNull(req.params.id)) {
      const PRODUCT_MODEL = buildProductModel(req.body);
      try {
        const product = await Product.update(PRODUCT_MODEL, {
          where: { id: req.params.id },
        });
        return res.status(200).json({
          status: "200 - SUCCESS",
          details: `Product: ${req.body.name} has been updated.`,
          data: product,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "500 - INTERNAL SERVER ERROR",
          details: error,
        });
      }
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `product with id: '${req.params.id}' does not exist.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    if (await checkProductNull(req.params.id)) {
      try {
        await Product.destroy({ where: { id: req.params.id } });
        return res.status(204).json({
          status: "204 - NO CONTENT",
          details: `Product with id: '${req.params.id}' deleted.`,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "500 - INTERNAL SERVER ERROR",
          details: error,
        });
      }
    } else {
      return res.status(404).json({
        status: "404 - NOT FOUND",
        details: `product with id: ${req.params.id} does not exist.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};

exports.createOne = async (req, res) => {
  try {
    if (await productVerifyExists(req.body.name)) {
      const PRODUCT_MODEL = buildProductModel(req.body);
      try {
        const product = await Product.create(PRODUCT_MODEL);
        return res.status(201).json({
          status: "201 - CREATED",
          details: `Product '${req.body.name}' has been saved.`,
          data: product,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: "500 - INTERNAL SERVER ERROR",
          details: error,
        });
      }
    } else {
      return res.status(404).json({
        status: "409 - CONFLICT",
        details: `product with id: '${req.body.name}' already exists.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "500 - INTERNAL SERVER ERROR",
      details: error,
    });
  }
};
