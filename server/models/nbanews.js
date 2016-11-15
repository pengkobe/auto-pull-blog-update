"use strict"
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const NBANewsSchema = new Schema({
    title: String,
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
}, { versionKey: false });
NBANewsSchema.set('toJSON', { getters: true, virtuals: true });
NBANewsSchema.set('toObject', { getters: true, virtuals: true });
NBANewsSchema.path('createTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
NBANewsSchema.path('lastEditTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
const nbanews = mongoose.model('nbanews', NBANewsSchema);
module.exports = nbanews;
