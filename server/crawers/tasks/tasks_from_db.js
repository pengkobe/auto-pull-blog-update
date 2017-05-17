/**
 * 批量从数据库执行任务
 */

const cheerio = require("cheerio");
const superagent = require("superagent");

const utils = require("../../utils/index");
const Blogger = require("../../models/blogger");
const Blognews_2 = require("../../models/blognews");

// 沙箱参考: http://nodejs.cn/api/vm
const vm = require("vm");
const util = require("util");
let taskNum = 0;

module.exports = async function runTasksFromDB(resolve, reject) {
  // 重启服务，任务置为 0
  taskNum = 0;
  let blogmodel = await Blogger.find({})
    .select("name createTime url taskjs lastUpdateTime")
    .exec()
    .catch(err => {
      utils.logger.error(err);
    });

  if (!blogmodel.length || blogmodel.length == 0) {
    reject("no blogger!");
  }
  for (let m in blogmodel) {
    if (blogmodel[m].taskjs != "" && blogmodel[m].taskjs.indexOf(".js") == -1) {
      taskNum += 1;
      let model = blogmodel[m];
      superagent.get(model.url).end(async function(err, sres) {
        try {
          // 常规的错误处理
          if (err) {
            console.log("get " + model.name + " err!\n", err);
            reject(err);
            return;
          }
          // 提取作者博文链接，注意去重
          let $ = cheerio.load(sres.text);

          /**
                     * __pulldata___:[]
                     *  _publishTime_: new Date(date),
                     *  _title_: title,
                     *  _link_: link
                     */

          const sandbox = {
            $: $,
            __pulldata___: {}
          };

          // eval(model.taskjs);
          var vmRet = vm.runInNewContext(model.taskjs, sandbox);
          //console.log('inspect sandbox:' + util.inspect(sandbox));

          let __pulldata___ = sandbox.__pulldata___;
          let newsArray = [];
          for (let i = 0; i < __pulldata___.length; i++) {
            if (
              !model.lastUpdateTime ||
              new Date(__pulldata___[i]._publishTime_) >
                new Date(model.lastUpdateTime)
            ) {
              newsArray.push({
                from: model._id,
                pullTime: Date.now,
                publishTime: new Date(__pulldata___[i]._publishTime_),
                title: __pulldata___[i]._title_,
                link: __pulldata___[i]._link_,
                date: __pulldata___[i]._publishTime_
              });
            }
          }

          // 无更新
          if (newsArray.length == 0) {
            resolve([]);
            return;
          }

          // 存入数据库
          Blognews_2.create(newsArray, function(err) {
            if (err) {
              reject("store article err！");
            }
            var docs = Array.prototype.slice.call(arguments, 1);
            resolve(docs);
          });

          // 更新最后更新时间
          // model.lastUpdateTime = new Date();
          Blogger.update(
            { _id: model._id },
            { $set: { lastUpdateTime: Date.now } },
            err => {
              if (err) {
                utils.logger.error(err);
                reject("Blogger.update错误！");
              }
            }
          );
        } catch (e) {
          reject(e);
          console.log(e);
        }
      });
    }
  }

  // 任务数为 0， 直接返回 []
  if (taskNum == 0) {
    resolve([]);
  }
};
