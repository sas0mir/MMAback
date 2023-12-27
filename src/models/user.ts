const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

module.exports = User;