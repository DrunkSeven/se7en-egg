'use strict';

const Controller = require('egg').Controller;
const room = 'default_room';
class DrawController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.args[0]);
    ctx.socket.join(room);
    const message = ctx.args[0];
    await ctx.broadcast.emit('draw', message);
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

module.exports = DrawController;