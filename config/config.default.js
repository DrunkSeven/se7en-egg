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
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563173034770_263';

  // add your middleware config here
  config.middleware = [];
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    // database: 'se7en',
    database: 'se7en_development',
    password: 'x5',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      db: 0,
      password: '',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  exports.httpclient = {
    httpAgent: {
      keepAlive: false,
    },
  };
  exports.security = {
    csrf: false,
  };
  exports.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [
          'auth',
        ],
        packetMiddleware: [],
      },
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
