/**
 * 任务管理
 */
const cheerio = require('cheerio');
const superagent = require('superagent');
const schedule = require('node-schedule');

const eventproxy = require('eventproxy');
const evtProxyObj = eventproxy();

// 任务列表
//let yinwang = require('./yinwang.org.js');
let yuguo = require('./yuguo.us.js');
let barretlee = require('./barretlee.com.js');

// 计时器
let schedule_task = null;
// 任务个数
let task_count = 2;

// db 任务
var tasks_from_db = require('./tasks_from_db.js');
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


module.exports = async function() {
    if (schedule_task) {
        schedule_task.cancel();
    }
    // 55 55 23
    schedule_task = schedule.scheduleJob('55 55 23 * * *', function() {

        tasks_from_db(function(param) {
            console.log('tasks_from_db完美运行一次:', new Date());
            console.log('docs:', param);
        }, function(param) {
            console.log('tasks_from_db失败运行一次:', new Date());
            console.log('tasks_from_db失败原因:', param);
        });

        yuguo(function(param) {
            console.log('yuguo完美运行一次:', new Date());
            console.log('docs:', param);
        }, function(param) {
            console.log('yuguo失败运行一次:', new Date());
            console.log('yuguo失败原因:', param);
        });



        // yinwang(function (param) {
        //     console.log('yinwang完美运行一次:', new Date());
        //     console.log('docs:', param);
        // }, function (param) {
        //     console.log('yinwang失败运行一次:', new Date());
        //     console.log('yinwang失败原因:', param);
        // });

        barretlee(function(param) {
            console.log('barretlee完美运行一次:', new Date());
            console.log('docs:', param);
        }, function(param) {
            console.log('barretlee失败运行一次:', new Date());
            console.log('barretlee失败原因:', param);
        });

    });

    // 第一次时自动运行一次

    let tasks_from_db_data = await new Promise((resolve, reject) => {
        console.log('>>> task');
        try {
            tasks_from_db(resolve, reject);
             console.log('>>> task...');
        } catch (e) {
            console.log(e);
        }
    });

    console.log('tasks_from_db task', tasks_from_db_data);
    let yuguo_data = await new Promise((resolve, reject) => {
        yuguo(resolve, reject);
    });

    console.log('yuguo task', yuguo_data);
    // let yinwang_data = await new Promise((resolve, reject) => {
    //     yinwang(resolve, reject);
    // });
    // console.log('yinwang task', yinwang_data);
    let barretlee_data = await new Promise((resolve, reject) => {
        barretlee(resolve, reject);
    });
    // console.log('barretlee task...',barretlee_data);

    return new Promise((resolve, reject) => {
        let dataArr = [];
        if (yuguo_data) {
            dataArr = dataArr.concat(yuguo_data);
        }
        // if(yinwang_data){
        //     dataArr = dataArr.concat(yinwang_data);
        // }
        if (barretlee_data) {
            dataArr = dataArr.concat(barretlee_data);
        }
        resolve(dataArr);
    });
}
