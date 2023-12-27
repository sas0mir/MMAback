const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Authors = sequelize.define("Authors", {
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
  context: {
    type: DataTypes.JSONB,
    allowNull: true,
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
});

module.exports = Authors;