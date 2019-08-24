'use strict';
const svgCaptcha = require('svg-captcha');
const request = require('request');
const Controller = require('egg').Controller;
class CommonController extends Controller {
  async searchMusic() {
    let url = "https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=%E7%AE%80%E5%8D%95%E7%88%B1"
    let body = await new Promise((resolve, reject) => {
      request.get(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          resolve(body)
        } else {
          reject(err)
        }
      })
    })
    const ctx = this.ctx;
    ctx.body = { data: body };
  }
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