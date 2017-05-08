"use strict";

/**
 * 博客新闻
 */
const utils = require("../utils/index");
const mongoose = require("mongoose"), Schema = mongoose.Schema;
const BlogNewsSchema = new Schema(
  {
    // 博主编号
    from: { type: Schema.Types.ObjectId, ref: "blogger" },
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
      default: ""
    },
    // 内容
    content: {
      type: String,
      default: ""
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

BlogNewsSchema.set("toJSON", { getters: true, virtuals: true });
BlogNewsSchema.set("toObject", { getters: true, virtuals: true });
BlogNewsSchema.path("pullTime").get(function(v) {
  var date = null;
  if (v) {
    date = new Date(v);
    date.setHours(date.getHours() + 8);
    date.format("yyyy-MM-dd hh:mm:ss");
    return;
  } else {
    date = new Date();
    date.setHours(date.getHours() + 8);
    return new Date().format("yyyy-MM-dd hh:mm:ss");
  }
});
BlogNewsSchema.path("publishTime").get(function(v) {
  var date = null;
  if (v) {
    date = new Date(v);
    date.setHours(date.getHours() + 8);
    date.format("yyyy-MM-dd hh:mm:ss");
    return;
  } else {
    date = new Date();
    date.setHours(date.getHours() + 8);
    return new Date().format("yyyy-MM-dd hh:mm:ss");
  }
});

/**
 * 更新阅读状态
 * @param {Object} from 博主编号
 * @param {Object} state 状态[ 0:未读 | 1:已读 ]
 */
BlogNewsSchema.statics.updateReadState = async function(_id, state) {
  var that = this;
  return new Promise(async function(resolve, reject) {
    var query = { _id: _id };
    var news = await that.findOne(query).exec().catch(err => {
      utils.logger.error(err);
    });
    console.log("updateReadState", news);
    news.hasRead = state;
    news.markModified("hasRead");
    news.save((err, doc) => {
      if (err) {
        utils.logger.error(err);
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

const blognews = mongoose.model("blognews", BlogNewsSchema);
module.exports = blognews;
