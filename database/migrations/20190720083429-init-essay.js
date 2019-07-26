'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('essays', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: STRING(30), allowNull: false },
      top: { type: INTEGER(1), defaultValue: 0 },
      created_at: DATE,
      updated_at: DATE,
      keyword: STRING(20),
      detail: { type: TEXT, allowNull: false },
      intorduction: { type: TEXT, allowNull: false },
      img: STRING(100),
      view_count: { type: INTEGER(8), defaultValue: 0 },
    })
    await queryInterface.addColumn('essays', 'type', {
      type: INTEGER(1)
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('essays');
  }
};
