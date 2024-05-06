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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sources: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  history: {
    type: DataTypes.JSONB,
    allowNull: true
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