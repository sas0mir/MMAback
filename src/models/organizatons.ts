const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Organizations = sequelize.define("Organizations", {
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
  clients: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  corp_subscription: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Organizations;