"use strict"
const blognews = require('./blognews');
const blogger = require('./blogger');
module.exports.init = async function (router) {
    blognews.init(router);
    blogger.init(router);
}
