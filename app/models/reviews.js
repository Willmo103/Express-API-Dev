const Sequelize = require("sequelize");
const db = require("../utils/database");
const User = require("./users");

const Review = db.define("reviews", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
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
