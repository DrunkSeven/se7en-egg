'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,TEXT } = app.Sequelize;

  const Essay = app.model.define('essay', {
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    title:STRING(30),
    top:INTEGER(1),
    created_at:DATE,
    updated_at:DATE,
    keyword:STRING(20),
    detail:TEXT,
    intorduction:TEXT,
    img:STRING(100),
    view_count:INTEGER(8),
  });

  return Essay;
};