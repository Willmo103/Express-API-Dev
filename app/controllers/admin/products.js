const Product = require("../../models/products");

exports.updateOne = async (req, res, next) => {
  try {
    const PRODUCT_MODEL = {
      name: req.body.name,
      price: req.body.price,
      cost: req.body.cost,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      quantity: req.body.quantity,
    };
    try {
      const product = await Product.update(PRODUCT_MODEL, {
        where: { id: req.params.id },
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "failed",
        reason: `product with id: ${req.params.id} does not exist.`,
      });
    }
    try {
      await Product.destroy({ where: { id: req.params.id } });
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: { name: req.body.name },
    });
    if (product) {
      return res.status(409).json({
        status: "conflict",
        reason: `product with id: ${req.body.name} already exists.`,
      });
    }
    try {
      const PRODUCT_MODEL = {
        name: req.body.name,
        price: req.body.price,
        cost: req.body.cost,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        quantity: req.body.quantity,
      };

      try {
        const product = await Product.create(PRODUCT_MODEL);
        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
