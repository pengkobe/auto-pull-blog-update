"use strict"
/**
 * 博主列表
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const BloggerSchema = new Schema({
    name: String,
    visits: {
        type: Number,
        default: 0
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    createTime: {
        type: Date
    },
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    hidden: Boolean,
    excerpt: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, { versionKey: false, skipVersioning: { tags: true } });
BloggerSchema.set('toJSON', { getters: true, virtuals: true });
BloggerSchema.set('toObject', { getters: true, virtuals: true });
BloggerSchema.path('createTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
BloggerSchema.path('lastEditTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
const blogger = mongoose.model('blogger', BloggerSchema);
module.exports = blogger;
