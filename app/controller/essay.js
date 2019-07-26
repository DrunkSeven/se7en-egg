'use strict';
const Sequelize = require('sequelize');
const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class EssayController extends Controller {
  async index() {
    const { type, pageSize, pageIndex, keyword } = this.ctx.query;
    const where = {};
    if (type) {
      where.type = type;
    }
    if (keyword) {
      where.title = { [Sequelize.Op.like]: `%${keyword}%` };
    }
    const query = { where: where, limit: toInt(pageSize), offset: toInt(pageIndex) };
    this.ctx.body = await this.ctx.model.Essay.findAndCountAll(query);
  }
  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Essay.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { title, top, keyword, detail, intorduction, img, view_count } = ctx.request.body;
    const essay = await ctx.model.Essay.create({ title, top, keyword, detail, intorduction, img, view_count });
    ctx.status = 201;
    ctx.body = essay;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const essay = await ctx.model.Essay.findByPk(id);
    if (!essay) {
      ctx.status = 404;
      return;
    }

    const { title, top, keyword, detail, intorduction, img, view_count } = ctx.request.body;
    await essay.update({ title, top, keyword, detail, intorduction, img, view_count });
    ctx.body = essay;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const essay = await ctx.model.Essay.findByPk(id);
    if (!essay) {
      ctx.status = 404;
      return;
    }

    await essay.destroy();
    ctx.status = 200;
  }
}

module.exports = EssayController;
