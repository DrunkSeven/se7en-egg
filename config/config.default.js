/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const security= {
    csrf: {
      headerName: 'x-csrf-token', // 通过 query 传递 CSRF token 的默认字段为 _csrf
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563173034770_263';

  // add your middleware config here
  config.middleware = [];
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    // database: 'se7en',
    database:'se7en_development',
    password:"x5"
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...security,
    ...config,
    ...userConfig,
  };
};
