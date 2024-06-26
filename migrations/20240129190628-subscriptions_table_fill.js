'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Subscriptions', [
      {
        id: 1,
        name: 'Бесплатная',
        users: null,
        privs: '["monitoring", "searching"]',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
      {
        id: 2,
        name: 'Премиум',
        users: null,
        privs: '["monitoring", "searching", "subscribing"]',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      },
      {
        id: 3,
        name: 'Экстра',
        users: null,
        privs: '["monitoring", "searching", "subscribing", "extra"]',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Subscriptions", {id: {[Op.in]: [1, 3]}}, {})
  }
};

