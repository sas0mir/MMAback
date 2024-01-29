const { DataTypes } = require("sequelize");
const sequelize = require("../database");

export const Users = sequelize.define("Users", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  org: {
    type: DataTypes.INTEGER,
    references: {
      model: "Organizations",
      key: "id",
    }
  },
  subscription_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Subscriptions",
      key: "id",
    }
  },
  subscription_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  themes: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  settings: {
    type: DataTypes.JSONB,
    allowNull: false,
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

module.exports = Users;