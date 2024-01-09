const { DataTypes } = require("sequelize");
const sequelize = require("../database");

export const Journal = sequelize.define("Journal", {
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
}, {
  freezeTableName: true
});

module.exports = Journal;