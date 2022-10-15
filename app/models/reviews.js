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
      key: User.username,
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
    allowNull: false,
  },
  subject: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: Product.id,
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  allowNull: false,
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
/*
id: req.body.id,
owner_id: req.body.owner_id,
title: req.body.title,
content: req.body.content,
rating: req.body.rating,
recommend: req.body.recommend
*/
