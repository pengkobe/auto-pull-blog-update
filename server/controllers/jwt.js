"use strict"
const jwt = require("jsonwebtoken"),
    configs = require("../config/index"),
    utils = require('../utils/index'),
    mw = require('../middlewares/index');
const cert = configs.jwt.cert;
module.exports.init = function (router) {
    router.post('/tokens', create);
    router.get('/tokens/check', mw.verify_token, check);
}

async function create(ctx, next) {
    const username = ctx.request.body.username,
        password = ctx.request.body.password;
    let user = {
        username: "py",
        password: "123",
    };
    if (user !== null) {
        if (user.password === password) {
            const token = jwt.sign({
                uid: "uuidmock",
                name: user.username,
                // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60//24 hours
            }, cert,, { expiresIn: '7d' });
            utils.print(token);
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: {
                    uid: 'uuidmock',
                    name: user.username,
                    token,
                }
            }
        } else {
            ctx.throw(401, '密码错误')
        }
    } else {
        ctx.throw(401, '用户名错误');
    }
}
async function check(ctx, next) {
    ctx.status = 200;
    ctx.body = {
        success: true,
        message: '验证通过'
    }
}
