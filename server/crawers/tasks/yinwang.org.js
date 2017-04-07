/**
* 抓取 yinwang.org( 已废弃 )
*/
const cheerio = require('cheerio');
const superagent = require('superagent');

const eventproxy = require('eventproxy');
const evtProxyObj = eventproxy();

const utils = require('../../utils/index');
const Blogger = require('../../models/blogger');
const Blognews_2 = require('../../models/blognews');

const page = 'http://yinwang.org';


module.exports = async function runTask(resolve, reject) {
    superagent.get(page).end(async function (err, sres) {
        // 常规的错误处理
        if (err) {
            console.log('get yinwang.org err!\n', err);
            reject(err);
            return next(err);
        }

        // 获取最新博文时间
        let blogmodel = await Blogger.find({ name: 'yinwang' })
            .exec().catch(err => {
                utils.logger.error(err);
                this.throw(500, '内部错误')
            });

        if (!blogmodel.length || blogmodel.length == 0) {
            reject("no blogger!");
            return next(err);
        } else {
            //console.log('blogmodel.lastUpdateTime:', new Date(date) > blogmodel[0].lastUpdateTime);
        }
        let blogger =  blogmodel[0];

        // 提取作者博文链接，注意去重
        let $ = cheerio.load(sres.text);
        let newsArray = [];
        // 获取
        $('.list-group-item').each(function (i, ele) {
            let title = $('a', ele).text();
            let link = $('a', ele).attr('href');
            let patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;
            let date = patt.exec(link)[0];

            // for test
            // let link = "http://yinwang.org/blog-cn/2016/10/12/compiler-bug";
            // let patt = /blog-cn\/(\d{4}\/\d{1,2}\/\d{0,2})/g;
            // let date = patt.exec(link)[1];

            // 时间对比 new Date("2016-11-01")
            if (!blogger.lastUpdateTime || new Date(date) > new Date(blogger.lastUpdateTime)) {
                newsArray.push({
                    from: blogger._id,
                    pullTime: new Date(),
                    publishTime: new Date(date),
                    title: title,
                    link: link,
                    date: date
                });
            }
        });

        // 存入数据库
        Blognews_2.create(newsArray, function (err) {
            if (err) {
                reject("store article err！");
                return next(err);
            }
            var docs = Array.prototype.slice.call(arguments, 1);
            resolve(docs);
        });

        // 更新最后拉取时间
        blogger.lastUpdateTime = new Date();
        await Blogger.update({ _id: blogger._id }, blogger)
            .exec().catch(err => {
                utils.logger.error(err);
                this.throw(500, 'Blogger.update错误');
            });

        // ===== 用于抓取内容（TODO）
        // evtProxyObj.emit('yiwang_indexpage_finished', 'get yinwang.org successful');
        // =====
    });
}


