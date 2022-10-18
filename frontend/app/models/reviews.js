const Sequelize = require("sequelize");
const db = require("../utils/database");
const User = require("./users");
const Product = require("./products");

const Review = db.define("reviews", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  owner: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: "username",
    },
    allowNull: false,
  },
  subject: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  recommend: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Review;
// fix broken ability for users to submit multiple reviews for the same product
