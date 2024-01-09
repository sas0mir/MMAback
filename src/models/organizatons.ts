//const { DataTypes } = require("sequelize");
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
const sequelize = require("../database");
//import { sequelize } from "../database";


//export default class Organizations extends Model<InferAttributes<Organizations>, InferCreationAttributes<Organizations>>
export const Organizations = sequelize.define("Organizations", {
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
}, {
  freezeTableName: true
});

module.exports = Organizations;