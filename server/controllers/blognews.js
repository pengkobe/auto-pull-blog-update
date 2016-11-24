"use strict"

const utils = require('../utils/index');
const Blognews = require('../models/blognews');
module.exports.init = async function (router) {
    await 100;
    router.get('/blognews', loadBlognews);
}

/**
 * 模拟数据
 */
async function seed() {
    let blognews = await Blognews.find().exec().catch(err => {
        utils.logger.error(err);
        throw (new Error('数据seed失败,请debug后重新启动'));
    });
    utils.print(blognews);
    if (0 === blognews.length) {
        blognews = new Blognews({ content: 'there is nothing yet!' })
        await blognews.save().catch(err => {
            utils.logger.error(err);
            throw (new Error('数据seed失败,请debug后重新启动'));
        });
    }
}

/**
 * 加载新闻列表
 */
async function loadBlognews() {
    let blognews = await Blognews.find().exec().catch(err => {
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
