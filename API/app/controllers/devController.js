const products = require("../../DevTools/updatedProducts");
const Product = require("../models/products");
const status = require("../utils/status");

exports.version = (req, res, next) => {
  return res.status(200).json({ API_version: "0.0.6" });
};

exports.fillProducts = async (req, res, next) => {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    try {
      const savedProduct = await Product.create(product);
      console.log(`Created ${product.name}`);
    } catch (error) {
      console.log(error);
      continue;
    }
  }
  res.status(200).json({
    status: "200 - SUCCESS",
    details: "Created products table",
  });
};

exports.testStatus = (req, res, next) => {
  return res.json(status.error("error"));
};
