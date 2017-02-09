/**
* 任务管理
*/
const cheerio = require('cheerio');
const superagent = require('superagent');
const schedule = require('node-schedule');

const eventproxy = require('eventproxy');
const evtProxyObj = eventproxy();

// 任务列表
var yinwang = require('yinwang.org.js');
var yuguo = require('yuguo.us.js');

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
    // 55 55 23
    schedule_task = schedule.scheduleJob('55 55 * * * *', function () {
        yuguo(function (param) {
            console.log('yuguo完美运行一次:', new Date());
            console.log('docs:', param);
        }, function (param) {
            console.log('yuguo失败运行一次:', new Date());
            console.log('yuguo失败原因:', param);
        });

        yinwang(function (param) {
            console.log('yinwang完美运行一次:', new Date());
            console.log('docs:', param);
        }, function (param) {
            console.log('yinwang失败运行一次:', new Date());
            console.log('yinwang失败原因:', param);
        });
    });

    return new Promise((resolve, reject) => {
        yuguo(resolve, reject);
        // yinwang(resolve, reject);
    });
}
