const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Theme = sequelize.define("Theme", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clients: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  prompt: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "Post_types",
        key: "id",
      }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
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

module.exports = Theme;