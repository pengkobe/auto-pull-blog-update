"use strict";

/**
 * NBA实时比分拉取
 */

const mongoose = require("mongoose"), Schema = mongoose.Schema;
const NBANewsSchema = new Schema(
  {
    // 比赛开始时间
    time: {
      type: Date
    },
    // 阶段( 0 : 未开始 )
    state: {
      type: Number,
      default: 0
    },

    // 客队
    guestTeam: String,

    // 比分
    score: String,

    // 主队
    homeTeam: String,

    // 集锦
    vedioCollection: String,

    // 数据
    gameData: String,

    // 前瞻/战报
    preView: String,

    // 直播/回放 （URL）
    live: String,

    lastEditTime: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: true }
);

NBANewsSchema.set("toJSON", { getters: true, virtuals: true });
NBANewsSchema.set("toObject", { getters: true, virtuals: true });
NBANewsSchema.path("time").get(function(v) {
 var date = null;
  if (v) {
    date = new Date(v);
    return date.format("yyyy-MM-dd hh:mm:ss");
  } else {
    return new Date().format("yyyy-MM-dd hh:mm:ss");
  }
});
const nbanews = mongoose.model("nbanews", NBANewsSchema);
module.exports = nbanews;
