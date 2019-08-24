'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('messages', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      msg: { type: STRING(300), allowNull: false },
      ip: { type: STRING(20), allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('messages');
  },
}