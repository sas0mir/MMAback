const { Sequelize } = require("sequelize");
//const Organizations = require("../models/organizatons");
import {Organizations} from "../models/organizatons";
import {Subscriptions} from "../models/subscriptions";
import {Journal} from "../models/journal";
import {Users} from "../models/users";
import {Authors} from "../models/authors";
import {Sources} from "../models/sources";
import {Post_types} from "../models/post_types";
import {Themes} from "../models/themes";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: true
  }
);

//create tables
// (async () => {
//   try {

//     //dont use require for models!!!
//     await Organizations.sync();
//     await Subscriptions.sync();
//     await Journal.sync();
//     await Users.sync();
//     await Authors.sync();
//     await Sources.sync();
//     await Post_types.sync();
//     await Themes.sync();
//     console.log("Tables created successfully.");
//   } catch (error) {
//     console.error("Unable to create tables:", error);
//   }
// })();
sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;