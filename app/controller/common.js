'use strict';
const svgCaptcha = require('svg-captcha');
const Controller = require('egg').Controller;
const request = require('request').defaults({
  rejectUnauthorized: false,
})
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
  async wxFile() {
    const ctx = this.ctx;
    const url = "https://mp.weixin.qq.com/s?__biz=Mzg3NTAyNTU2Mw==&mid=2247483712&idx=1&sn=5d9dc777ce5e72dba87c12b134a0df14&chksm=cec684b4f9b10da2947eff09bc9"
    const a = await new Promise((resolve, reject) => {
      request(url, (err, res) => {

        resolve(res.body);
        // let html = res.replace(/data-src/g, "src");
        // html = html.replace('visibility: hidden;', "");

        // let html_src = 'data:text/html;charset=utf-8,' + html;
        // document.getElementById("iframe").src = html_src;
      });
    });

    ctx.body = a;
  }
}
module.exports = CommonController;