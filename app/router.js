'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/token', controller.common.token);
  router.post('/verificationCode', controller.common.verificationCode);
  router.get('/essay', controller.essay.index);
  router.get('/essay/:id', controller.essay.show);
  router.get('/essay', controller.essay.create);
  router.get('/message', controller.message.index);
  router.post('/message', controller.message.create);
};
