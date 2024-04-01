'use strict';

const { platform } = require('os');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable("Organizations", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        clients: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        corp_subscription: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Subscriptions", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        users: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        privs: {
          type: Sequelize.JSONB,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Authors", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        context: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        sources: {
          type: Sequelize.JSONB,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Post_types", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Platforms", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        context: {
          type: Sequelize.JSONB,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Users", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        org: {
          type: Sequelize.INTEGER,
          references: {
            model: "Organizations",
            key: "id",
          }
        },
        subscription_type: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Subscriptions",
            key: "id",
          }
        },
        subscription_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        themes: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        sources: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        settings: {
          type: Sequelize.JSONB,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Sources", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        context: {
          type: Sequelize.JSONB,
          allowNull: true
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        platform: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Platforms",
              key: "id",
          }
        },
        account_name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Themes", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        clients: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        prompt: {
          type: Sequelize.JSONB,
          allowNull: true
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        sources: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
      queryInterface.createTable("Journal", {
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
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        },
      }, {
        freezeTableName: true
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.dropTable('Sources'),
      queryInterface.dropTable('Organizations'),
      queryInterface.dropTable('Subscriptions'),
      queryInterface.dropTable('Authors'),
      queryInterface.dropTable('Post_types'),
      queryInterface.dropTable('Users'),
      queryInterface.dropTable('Themes'),
      queryInterface.dropTable('Journal'),
      queryInterface.dropTable('Platforms')
    ]);
  },
};
