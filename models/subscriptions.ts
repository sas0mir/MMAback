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
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  users: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  privs: {
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

module.exports = Subscriptions;