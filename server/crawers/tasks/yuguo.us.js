/**
* 抓取 https://yuguo.us/
*/
const cheerio = require('cheerio');
const superagent = require('superagent');

const eventproxy = require('eventproxy');
const evtProxyObj = eventproxy();

const utils = require('../../utils/index');
const Blogger = require('../../models/blogger');
const Blognews_2 = require('../../models/blognews');

const page = 'https://yuguo.us/';

module.exports = async function runTask(resolve, reject) {
        superagent.get(page).end(async function (err, sres) {

            // 获取最新博文时间
            let blogmodel = await Blogger.find({ name: 'yuguo' })
                .exec().catch(err => {
                    utils.logger.error(err);
                    this.throw(500, '内部错误')
                });

            // 常规的错误处理
            if (err) {
                console.log('get yuguo.us err!\n', err);
                reject(err);
                return next(err);
            }

            // 提取作者博文链接，注意去重
            let $ = cheerio.load(sres.text);
            let newsArray = [];

            // 获取欧文
            $('li.post').each(function (i, ele) {
                let title = $('a>span', ele).text();
                let rawLink =  $('a', ele).attr('href');
                let link = rawLink.indexOf("http") == -1 ? ('https://yuguo.us/' + $('a', ele).attr('href')):rawLink ;
                let date = $('a>time', ele).attr("datetime");

                if (!blogmodel.length || blogmodel.length == 0) {
                    reject("no blogger!");
                    return next(err);
                } else {
                     //console.log('yuguo.lastUpdateTime:', new Date(date) > blogmodel[0].lastUpdateTime);
                }

                // 时间对比 new Date("2016-11-01")
                if (new Date(date) > blogmodel[0].lastUpdateTime || !blogmodel[0].lastUpdateTime) {
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
            blogmodel[0].lastUpdateTime = new Date();
            await Blogger.update({ _id: blogmodel[0]._id }, blogmodel[0])
                .exec().catch(err => {
                    utils.logger.error(err);
                    this.throw(500, 'Blogger.update错误');
                });

        });
    }


