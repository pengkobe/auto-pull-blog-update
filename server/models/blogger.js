"use strict"
/**
 * Blogger
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const BloggerSchema = new Schema({
    // 名字
    name: String,
    // 博客地址
    url: String,
    // 创建时间
    createTime: {
        type: Date
    },
    // 最近一次更新
    lastUpdateTime: {
        type: Date
    }
},
    { versionKey: false });
BloggerSchema.set('toJSON', { getters: true, virtuals: true });
BloggerSchema.set('toObject', { getters: true, virtuals: true });
BloggerSchema.path('createTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
BloggerSchema.path('lastUpdateTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
const blogger = mongoose.model('blogger', BloggerSchema);
module.exports = blogger;
