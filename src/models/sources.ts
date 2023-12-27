const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Sources = sequelize.define("Sources", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  context: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
});

module.exports = Sources;