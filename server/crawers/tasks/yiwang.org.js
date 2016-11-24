/**
* 抓取 yinwang.org
*/
const cheerio = require('cheerio');
const superagent = require('superagent');
const schedule = require('node-schedule');

const eventproxy = require('eventproxy');
const evtProxyObj = eventproxy();

const utils = require('../../utils/index');
const Blogger = require('../../models/blogger');
const Blognews_2 = require('../../models/blognews');

const page = 'http://yinwang.org';

// 计时器
let schedule_task = null;
// github: https://github.com/node-schedule/node-schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

module.exports = async function () {
    if (schedule_task) {
        schedule_task.cancel();
    }
    schedule_task = schedule.scheduleJob('0 0 23 * * *', function () {
        runTask(function (param) {
            console.log('完美运行一次:', new Date());
        }, function (param) { })
    });

    // 地址
    async function runTask(resolve, reject) {
        superagent.get(page).end(async function (err, sres) {

            // 获取最新博文时间
            let blogmodel = await Blogger.find({ name: 'yiwang' })
                .exec().catch(err => {
                    utils.logger.error(err);
                    this.throw(500, '内部错误')
                });

            // 常规的错误处理
            if (err) {
                console.log('get yinwang.org err!\n', err);
                return next(err);
            }

            // 提取作者博文链接，注意去重
            let $ = cheerio.load(sres.text);
            let newsArray = [];

            // 获取欧文
            $('.list-group-item').each(function (i, ele) {
                let title = $('a', ele).text();
                let link = $('a', ele).attr('href');

                // for test
                // let link = "http://yinwang.org/blog-cn/2016/10/12/compiler-bug";
                // let patt = /blog-cn\/(\d{4}\/\d{1,2}\/\d{0,2})/g;
                // let date = patt.exec(link)[1];

                let patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;
                let date = patt.exec(link)[0];

                // 时间对比 (todo)
                if (blogmodel.length > 0) {
                    console.log('blogmodel.lastUpdateTime:', blogmodel[0].lastUpdateTime);
                }
                if (new Date(date) > blogmodel.lastUpdateTime) {
                    newsArray.push({
                        from: blogmodel[0]._id,
                        pullTime: new Date(),
                        publishTime: new Date(date),
                        title: title,
                        link: link,
                        date: date
                    });
                }
            });

            // 存入数据库 (todo)
            Blognews_2.create(newsArray, function (err) {
                if (err) {
                    return;
                }
                var docs = Array.prototype.slice.call(arguments, 1);
                resolve(docs);
                // docs 就是才创建的所有记录
            });

            evtProxyObj.emit('yiwang_indexpage_finished', 'get yinwang.org successful');
        });
    }

    return new Promise((resolve, reject) => {
        runTask(resolve, reject);
    });
}
