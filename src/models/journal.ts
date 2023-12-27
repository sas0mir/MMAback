const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Journal = sequelize.define("Journal", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: "User",
        key: "id",
      }
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: true
  },
});

module.exports = Journal;