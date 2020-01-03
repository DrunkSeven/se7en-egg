'use strict';


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
    let key = "";
    if (message.action === 'onmouseup' || message.action === 'cancel') {
      key = `${room}:wb_${message.pptIndex + 1}`;
    } else if (message.action === 'goPage') {
      key = `${room}:wb_ppt`;
    }
    if (key) {
      await this.app.redis.rpush(key, JSON.stringify(message));
    }
  }

  async clear() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0];
    await nsp.emit('text', message);
  }
}

module.exports = DrawController;