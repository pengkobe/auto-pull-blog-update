"use strict"
/**
 * Blogger
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const BloggerSchema = new Schema({
    name: String,
    createTime: {
        type: Date
    },
    url: String
},
    { versionKey: false });
BloggerSchema.set('toJSON', { getters: true, virtuals: true });
BloggerSchema.set('toObject', { getters: true, virtuals: true });
BloggerSchema.path('createTime').get(function (v) {
    return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
const blogger = mongoose.model('blogger', BloggerSchema);
module.exports = blogger;
