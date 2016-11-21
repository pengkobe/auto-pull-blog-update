"use strict"

/**
 * 博客新闻
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const BlogNewsSchema = new Schema({
    // 博主编号
    from: { type: Schema.Types.ObjectId },
    // 标题
    title: String,
    // 拉取时间
    pullTime: {
        type: Date,
        default: Date.now
    },
    // 发表时间
    publishTime: {
        type: Date,
        default: Date.now
    },
    // 内容
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
    }]
},
    {
        versionKey: false
    }
);
BlogNewsSchema.set('toJSON', { getters: true, virtuals: true });
BlogNewsSchema.set('toObject', { getters: true, virtuals: true });
BlogNewsSchema.path('pullTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
BlogNewsSchema.path('publishTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
const blognews = mongoose.model('blognews', BlogNewsSchema);
module.exports = blognews;
