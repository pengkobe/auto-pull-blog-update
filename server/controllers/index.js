"use strict"
const blognews = require('./blognews');
const blogger = require('./blogger');
const jwt = require('./jwt');
module.exports.init = async function (router) {
    jwt.init(router);
    blognews.init(router);
    blogger.init(router);
}
