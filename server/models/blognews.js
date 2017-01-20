"use strict"

/**
 * 博客新闻
 */
const utils = require('../utils/index');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const BlogNewsSchema = new Schema({
    // 博主编号
    from: { type: Schema.Types.ObjectId, ref: 'blogger' },
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
    // 链接
    link: {
        type: String,
        default: ''
    },
    // 内容
    content: {
        type: String,
        default: ''
    },
    comments: [],
    hasRead: {
        type: Boolean,
        default: false
    }
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

/**
 * 更新阅读状态
 * @param {Object} from 博主编号
 * @param {Object} state 状态[ 0:未读 | 1:已读 ]
 */
UserSchema.statics.updateReadState = async function (from, state) {
    var query = { from: from };
    var news = await this.findOne(query).exec().catch(err => {
            utils.logger.error(err);
    });
    console.log("updateReadState", news);
    news.hasRead = state;
    news.markModified('hasRead');
    news.save(err =>{
        utils.logger.error(err);
    });
}


const blognews = mongoose.model('blognews', BlogNewsSchema);
module.exports = blognews;
