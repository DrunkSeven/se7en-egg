'use strict';

module.exports = {
  getMD5Str(str) {
    const md5 = require('crypto').createHash('md5');
    return md5.update(str).digest('hex');
  },
};