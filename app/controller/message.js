'use strict';

const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class MessageController extends Controller {
  async index() {
    const { pageSize, pageIndex } = this.ctx.query;
    const query = { order: [['id', 'DESC']], limit: toInt(pageSize), offset: (toInt(pageIndex) - 1) * toInt(pageSize) };
    this.ctx.body = await this.ctx.model.Message.findAndCountAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Message.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { msg, code, token } = ctx.request.body;
    const value = await this.app.redis.get(token);
    let Message = '';
    if (value && value === code.toUpperCase()) {
      Message = await ctx.model.Message.create({ msg: msg, ip: ctx.ip });
    }
    ctx.status = 200;
    const body = {};
    if (Message.dataValues) {
      body.flag = 1;
    } else {
      body.flag = 0;
    }
    ctx.body = body;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Message = await ctx.model.Message.findByPk(id);
    if (!Message) {
      ctx.status = 404;
      return;
    }

    const { title, top, keyword, detail, intorduction, img, view_count } = ctx.request.body;
    await Message.update({ title, top, keyword, detail, intorduction, img, view_count });
    ctx.body = Message;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Message = await ctx.model.Message.findByPk(id);
    if (!Message) {
      ctx.status = 404;
      return;
    }

    await Message.destroy();
    ctx.status = 200;
  }
}

module.exports = MessageController;
