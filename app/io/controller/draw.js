'use strict';
const fs = require('fs');
const path = require('path');
const filePath = path.join(`${process.cwd()}/json/`);
const Controller = require('egg').Controller;
class DrawController extends Controller {
  async index() {
    const { ctx } = this;

    const message = ctx.args[0];
    // await ctx.broadcast.emit('draw', message);
    const { socket, app } = this.ctx;
    const query = socket.handshake.query;
    const { room, userId } = query;
    const nsp = app.io.of('/');
    ctx.socket.join(room);
    nsp.to(room).emit('draw', message);
    if (message.action === 'onmouseup' || message.action === 'prePage' || message.action === 'nextPage') {
      await this.app.redis.rpush(room, JSON.stringify(message));
      // readFile('all.json').then(v => {
      //   if (v.toString('UTF-8') === '[') {
      //     appendFile('all.json', JSON.stringify(message) + ']');
      //   } else {
      //     appendFile('all.json', ',' + JSON.stringify(message) + ']');
      //   }
      // });
    }
  }
  async ppt() {
    const { ctx } = this;
    console.log(ctx.args[0]);
    ctx.socket.join(room);
    const message = ctx.args[0];
    await ctx.broadcast.emit('ppt', message);

  }
  async clear() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0];
    await nsp.emit('text', message);
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
function appendFile(name, data) {
  fs.appendFile(path.join(filePath, name), data, 'utf8', (err) => {
    if (err) {
      console.log("写入失败");
    } else {
      return;
    }
  });
}
module.exports = DrawController;