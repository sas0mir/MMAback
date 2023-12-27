const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Post_types = sequelize.define("Post_types", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  context: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Authors",
        key: "id",
      }
  },
  source: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Sources",
        key: "id",
      }
  },
});

module.exports = Post_types;