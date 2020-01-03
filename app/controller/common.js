'use strict';
const svgCaptcha = require('svg-captcha');
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const filePath = path.join(`${process.cwd()}/json/`);
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
  async getDrawInfo() {
    const ctx = this.ctx;
    const { page, room } = ctx.request.body;
    const pptInfo = await this.app.redis.lrange(`${room}:wb_ppt`, -1, -1);
    let pageIndex = 1;
    if (page) {
      pageIndex = page;
    } else if (pptInfo.length) {
      pageIndex = JSON.parse(pptInfo[0]).slide;
    } else {
      pageIndex = 1;
    }
    const drawInfo = await this.app.redis.lrange(`${room}:wb_${pageIndex}`, 0, -1);
    ctx.body = { page: pptInfo[0] || {}, draw: drawInfo };
  }
  async finishClass() {
    const ctx = this.ctx;
    // const a = await this.app.redis.lrange('1', 0, -1);
    // writeFileSync('all.json', JSON.stringify(a));
    this.app.redis.flushall();
    ctx.body = true;
  }
}
function readFile(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(filePath, name), (err, res) => {
      if (err) {
        console.log(err);
      } else {
        resolve(res);
      }
    });
  });
}
function mkdirFile(path) {
  try {
    fs.mkdirSync(path);
  } catch (err) {
    return;
  }
}
function writeFileSync(name, data) {
  fs.writeFileSync(path.join(filePath, name), data, 'utf8', (err) => {
    if (err) {
      console.log("写入失败");
    } else {
      return;
    }
  });
}
module.exports = CommonController;