'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [1, 20]
      },
      topic: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [1, 50]
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        len: [1, 100]
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expired: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      comment_count: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Posts');
  }
};
