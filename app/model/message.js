'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Message = app.model.define('message', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    msg: { type: STRING(300), allowNull: false },
    ip: { type: STRING(20), allowNull: false },
    created_at: DATE,
    updated_at: DATE,
  });

  return Message;
};