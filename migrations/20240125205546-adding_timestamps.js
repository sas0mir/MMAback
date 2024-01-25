'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Sources", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Sources", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Sources", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Organizations", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Organizations", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Organizations", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Subscriptions", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Subscriptions", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Subscriptions", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Authors", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Authors", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Authors", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Post_types", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Post_types", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Post_types", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Users", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Users", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Users", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Journal", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Journal", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Journal", "deletedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Themes", "cratedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Themes", "updatedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Themes", "deletedAt", {
        type: Sequelize.DATE,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Sources', 'createdAt'),
      queryInterface.removeColumn('Sources', 'updatedAt'),
      queryInterface.removeColumn('Sources', 'deletedAt'),
      queryInterface.removeColumn('Organizations', 'createdAt'),
      queryInterface.removeColumn('Organizations', 'updatedAt'),
      queryInterface.removeColumn('Organizations', 'deletedAt'),
      queryInterface.removeColumn('Subscriptions', 'createdAt'),
      queryInterface.removeColumn('Subscriptions', 'updatedAt'),
      queryInterface.removeColumn('Subscriptions', 'deletedAt'),
      queryInterface.removeColumn('Authors', 'createdAt'),
      queryInterface.removeColumn('Authors', 'updatedAt'),
      queryInterface.removeColumn('Authors', 'deletedAt'),
      queryInterface.removeColumn('Post_types', 'createdAt'),
      queryInterface.removeColumn('Post_types', 'updatedAt'),
      queryInterface.removeColumn('Post_types', 'deletedAt'),
      queryInterface.removeColumn('Users', 'createdAt'),
      queryInterface.removeColumn('Users', 'updatedAt'),
      queryInterface.removeColumn('Users', 'deletedAt'),
      queryInterface.removeColumn('Journal', 'createdAt'),
      queryInterface.removeColumn('Journal', 'updatedAt'),
      queryInterface.removeColumn('Journal', 'deletedAt'),
      queryInterface.removeColumn('Themes', 'createdAt'),
      queryInterface.removeColumn('Themes', 'updatedAt'),
      queryInterface.removeColumn('Themes', 'deletedAt'),
    ]);
  },
};

