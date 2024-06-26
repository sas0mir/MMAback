const { DataTypes } = require("sequelize");
const sequelize = require("../database");

export const Sources = sequelize.define("Sources", {
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
  platform: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        model: "Platforms",
        key: "id",
    }
  },
  account_name: {
    type: DataTypes.STRING,
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

module.exports = Sources;