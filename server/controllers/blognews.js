"use strict"

const utils = require('../utils/index');
const Blognews = require('../models/blognews');
const mw = require('../middlewares/index.js');
module.exports.init = function (router) {
    // mw.verify_token,
    router.get('/blognews',mw.verify_token, loadBlognews);
    router.post('/updateReadState',mw.verify_token,updateReadState);
}

/**
 * 加载新闻列表
 */
async function loadBlognews(ctx, next) {
    let blognews = await Blognews.find()
        .populate('from')
        .sort({ hasRead:1,publishTime: -1 })
        .select('_id from title link pullTime publishTime hasRead')
        .limit(10)
        .skip(0)
        .exec().catch(err => {
            utils.logger.error(err);
            ctx.throw(500, '内部错误');
        })
    if (blognews.length) {
        // delete blognews._id;
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: blognews
        };
    } else {
        ctx.throw(500, '内部错误');
    }
}

/**
 * 更新阅读状态
 */
async function updateReadState(ctx, next) {
    const _id = ctx.request.body.from;
    const state = ctx.request.body.state;
    let result = await Blognews.updateReadState(_id, state);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: result
    };
}

