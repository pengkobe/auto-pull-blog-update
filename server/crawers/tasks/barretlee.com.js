/**
* 抓取 https://barretlee.com/
*/
const cheerio = require('cheerio');
const superagent = require('superagent');

const eventproxy = require('eventproxy');
const evtProxyObj = eventproxy();

const utils = require('../../utils/index');
const Blogger = require('../../models/blogger');
const Blognews_2 = require('../../models/blognews');

const page = 'http://www.barretlee.com/entry/';

module.exports = async function runTask(resolve, reject) {
    superagent.get(page).end(async function (err, sres) {
        // 常规的错误处理
        if (err) {
            console.log('get barretlee.com err!\n', err);
            reject(err);
            return ;
        }

        // 获取最新博文时间
        let blogmodel = await Blogger.find({ name: 'barretlee' })
            .exec().catch(err => {
                utils.logger.error(err);
                reject(err);
            });

        if (!blogmodel.length || blogmodel.length == 0) {
            reject("no blogger!");
            return ;
        } else {
            //console.log('barretlee.lastUpdateTime:', new Date(date) > blogmodel[0].lastUpdateTime);
        }

        let blogger = blogmodel[0];

        // 提取作者博文链接，注意去重
        let $ = cheerio.load(sres.text);
        let newsArray = [];
        $("ul[itemscope]").find("a").each(function (i, ele) {
            let title = $(ele).text();
            // 报错无返回
            if (title == "更多文章...") {
                return;
            }
            //console.log('"ul[itemscope] > title:', title);
            let rawLink = $(ele).attr('href');
            let link = rawLink.indexOf("http") == -1 ? ('http://www.barretlee.com' + rawLink) : rawLink;
            let patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;

            let date = patt.exec(link)[0];

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
        console.log('  存入数据库  前!\n', err);
        // 存入数据库
        Blognews_2.create(newsArray, function (err) {
            if (err) {
                reject("store article err！");
                reject(err);
                return ;
            }
            var docs = Array.prototype.slice.call(arguments, 1);
            resolve(docs);
        });

        // 更新最后拉取时间
        blogger.lastUpdateTime = new Date();
        await Blogger.update({ _id: blogger._id }, blogger)
            .exec().catch(err => {
                utils.logger.error(err);
                reject(err);
            });
    });
}


