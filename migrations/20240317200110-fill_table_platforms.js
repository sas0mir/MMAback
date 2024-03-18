'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Platforms', [
      {
        id: 1,
        name: 'Telegram',
        context: '["messenger", "sng"]',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
      {
        id: 2,
        name: 'Yandex',
        context: '["search system", "sng"]',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
      {
        id: 3,
        name: 'Google',
        context: '["search system", "american"]',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Platforms", {id: {[Op.in]: [1, 3]}}, {})
  }
};

