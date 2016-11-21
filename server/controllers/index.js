"use strict"
const blognews = require('./blognews');
const blogger = require('./blogger');
module.exports.init = async function (router) {
    await blognews.init(router);
    blogger.init(router);
}
