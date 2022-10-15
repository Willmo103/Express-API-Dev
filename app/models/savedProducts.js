const Sequelize = require("sequelize");
const db = require("../utils/database");
const User = require("./users");
const Product = require("./products");

const Saved = db.define("savedProducts", {
  owner: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: User.username,
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
    primaryKey: true,
    allowNull: false,
  },
  product: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: Product.id,
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Saved;
