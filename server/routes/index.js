"use strict"

var crawers = require('../crawers/index.js');

module.exports.init = function (router) {

  /**
  * 渲染首页
  */
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'yipeng crawler'
    };
    await ctx.render('index', {
    });
  });

  /**
   * 开启爬虫
   */
  router.get('/begintasks', async function (ctx, next) {
    console.log('i am here!get');
    let info = await crawers();
    console.log('i am here!body');
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: info
    };
  });

}

