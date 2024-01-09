const { DataTypes } = require("sequelize");
const sequelize = require("../database");

export const Subscriptions = sequelize.define("Subscriptions", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  users: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  privs: {
    type: DataTypes.JSONB,
    allowNull: true
  },
}, {
  freezeTableName: true
});

module.exports = Subscriptions;