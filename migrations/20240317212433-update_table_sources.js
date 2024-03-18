'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Sources", "platform", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: "Platforms",
            key: "id",
        }
      }),
      queryInterface.addColumn("Sources", "account_name", {
        type: Sequelize.STRING,
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Sources', 'platform'),
      queryInterface.removeColumn('Sources', 'account_name')
    ])
  }
};
