'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
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
      }, {
        freezeTableName: true
      }),
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
        users: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        privs: {
          type: Sequelize.JSONB,
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
        source: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Sources",
              key: "id",
            }
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
        context: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        author: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Authors",
              key: "id",
            }
        },
        source: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Sources",
              key: "id",
            }
        },
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
          allowNull: false,
        },
        settings: {
          type: Sequelize.JSONB,
          allowNull: false,
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
        type: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Post_types",
              key: "id",
            }
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        source: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: "Sources",
              key: "id",
            }
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
      queryInterface.dropTable('Journal'),
      queryInterface.dropTable('Themes'),
    ]);
  },
};
