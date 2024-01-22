'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Journal", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
          }
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: true
      },
    }, {
      freezeTableName: true
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Journal')
  }
};
