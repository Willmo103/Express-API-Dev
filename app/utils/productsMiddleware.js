const Product = require("../models/products");

exports.checkProductNull = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.productVerifyExists = async (name) => {
  try {
    const product = await Product.findOne({
      where: { name: name },
    });
    if (product) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};

exports.buildProductModel = (body = {}) => {
  try {
    const PRODUCT_MODEL = {
      name: body.name,
      price: body.price,
      salesPrice: body.salesPrice,
      cost: body.cost,
      imageUrl: body.imageUrl,
      description: body.description,
      quantity: body.quantity,
    };
    return PRODUCT_MODEL, next;
  } catch (error) {
    console.log(error);
    return;
  }
};
