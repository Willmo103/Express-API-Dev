const Sequelize = require("sequelize");
const db = require("../utils/database");
const User = require("./users");
const Product = require("./products");

const Saved = db.define("savedProducts", {
  owner: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: "username",
    },
    primaryKey: true,
    allowNull: false,
  },
  product: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Saved;
