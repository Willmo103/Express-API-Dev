const Sequelize = require("sequelize");
const db = require("../utils/database");

const Product = db.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
  },
  salePrice: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: true,
  },
  cost: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// TODO: add a colors array field
// TODO: add a sales price field
module.exports = Product;
