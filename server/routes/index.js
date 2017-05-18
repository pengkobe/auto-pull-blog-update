"use strict"

var crawers = require('../crawers/index.js');
global.taskStarted = false;

module.exports.init = function(router) {

    /**
     * 渲染首页
     */
    router.get('/', async function(ctx, next) {
        ctx.state = {
            title: 'yipeng crawler'
        };
        await ctx.render('index', {});
    });

    /**
     * 开启爬虫
     */
    router.get('/begintasks', async function(ctx, next) {
        if (global.taskStarted == true) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                started: true,
                data: []
            };
        } else {
            console.log('i am here!get');
            let info = await crawers();
            console.log('i am here!body');
            ctx.status = 200;
            global.taskStarted = true;
            ctx.body = {
                success: true,
                started: false,
                data: info
            };
        }
    });


    /**
     * 重新加载爬虫
     */
    router.get('/reloadtasks', async function(ctx, next) {
            console.log('i am reloadtasks!get');
            let info = await crawers();
            console.log('i am reloadtasks!body');
            ctx.status = 200;
            global.taskStarted = true;
            ctx.body = {
                success: true,
                started: false,
                data: info
            };
    });

    

    /**
     * 查看任务开启状态
     */
    router.get('/taskstate', async function(ctx, next) {
        if (global.taskStarted == true) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                started: true
            };
        } else {
            ctx.status = 200;
            ctx.body = {
                success: true,
                started: false
            };
        }
    });
}
