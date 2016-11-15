
"use strict"
const utils = require('../utils/index'),
const Blognews = require('../models/blognews.js');
module.exports.init = function* (router) {
    yield seed;
    router.get('/blognews', loadBlognews);
    router.patch('/blognews', modify);
}

/**
 * 模拟数据
 */
function* seed() {
    let blognews = yield Blognews.find().exec().catch(err => {
        utils.logger.error(err);
        throw (new Error('数据seed失败,请debug后重新启动'));
    });
    utils.print(blognews);
    if (0 === blognews.length) {
        blognews = new Blognews({ content: 'there is nothing yet!' })
        yield blognews.save().catch(err => {
            utils.logger.error(err);
            throw (new Error('数据seed失败,请debug后重新启动'));
        });
    }
}

/**
 * 加载新闻列表
 */
function* loadBlognews() {
    let blognews = yield Blognews.find().exec().catch(err => {
        utils.logger.error(err);
        this.throw(500, '内部错误');
    })
    if (blognews.length) {
        blognews = blognews[0].toObject();
        delete blognews._id;
        this.status = 200;
        this.body = {
            success: true,
            data: blognews
        };
    } else {
        this.throw(500, '内部错误');
    }
}
