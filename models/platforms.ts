const { DataTypes } = require("sequelize");
const sequelize = require("../database");

export const Platforms = sequelize.define("Platforms", {
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

module.exports = Platforms;