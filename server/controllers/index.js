"use strict"
const blognews = require('./blognews');
module.exports.init = function* (router) {
    yield blognews.init(router)
}
