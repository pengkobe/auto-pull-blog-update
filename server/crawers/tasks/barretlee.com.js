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
            
            // 获取最新博文时间
            let blogmodel = await Blogger.find({ name: 'barretlee' })
                .exec().catch(err => {
                    utils.logger.error(err);
                    this.throw(500, '内部错误')
                });
          
            // 常规的错误处理
            if (err) {
                console.log('get barretlee.com err!\n', err);
                reject(err);
                return next(err);
            }
       
            // 提取作者博文链接，注意去重
            let $ = cheerio.load(sres.text);
            let newsArray = [];

            $("ul[itemscope]").find("a").each(function (i, ele) {
                let title = $(ele).text();
                // 报错无返回
                if(title == "更多文章..."){
                    return;
                }
                console.log('"ul[itemscope] > title:', title);
                let rawLink =  $(ele).attr('href');
                let link = rawLink.indexOf("http") == -1 ? ('http://www.barretlee.com/entry/' + rawLink):rawLink ;
                let patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;
                
                let date = patt.exec(link)[0];
                
                if (!blogmodel.length || blogmodel.length == 0) {
                    reject("no blogger!");
                    return next(err);
                } else {
                     //console.log('barretlee.lastUpdateTime:', new Date(date) > blogmodel[0].lastUpdateTime);
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
            console.log('  存入数据库  前!\n', err);
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

            // ===== 用于抓取内容（TODO）
            // evtProxyObj.emit('yiwang_indexpage_finished', 'get yinwang.org successful');
            // =====
        });
    }


