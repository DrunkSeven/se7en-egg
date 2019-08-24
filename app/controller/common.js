'use strict';
const svgCaptcha = require('svg-captcha');
const Controller = require('egg').Controller;
class CommonController extends Controller {
  async token() {
    const ctx = this.ctx;
    ctx.body = { data: true };
  }
  async verificationCode() {
    const ctx = this.ctx;
    let md5 = '';
    const data = svgCaptcha.create();
    if (!this.ctx.request.body.token) {
      const key = ctx.ip + new Date().getTime();
      md5 = ctx.helper.getMD5Str(key);
    } else {
      md5 = this.ctx.request.body.token;
    }
    await this.app.redis.set(md5, data.text.toUpperCase(), 'Ex', 300);
    ctx.body = { ctx: this.ctx, data: data.data, token: md5 };
  }
}
module.exports = CommonController;