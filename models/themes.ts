const { DataTypes } = require("sequelize");
const sequelize = require("../database");

export const Themes = sequelize.define("Themes", {
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
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  freezeTableName: true
});

module.exports = Themes;