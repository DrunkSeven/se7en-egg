'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async index() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0];
    await nsp.emit('text', message);
  }
  async rtcInfo() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0];
    await nsp.emit('rtc', message);
  }
  async userList() {
    const { socket, app } = this.ctx;
    const query = socket.handshake.query;
    const nsp = app.io.of('/');
    // 用户信息
    const { room, userId } = query;
    const rooms = [room];
    nsp.adapter.clients(rooms, (err, clients) => {
      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'getList',
        target: 'participator',
        time: new Date().getTime(),
      });
    });
  }
}

module.exports = DefaultController;