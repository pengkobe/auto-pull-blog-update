/**
* 抓取 yinwang.org
*/
var cheerio = require('cheerio');
var superagent = require('superagent');

var eventproxy = require('eventproxy');
var evtProxyObj = eventproxy();

const utils = require('../../utils/index');
const Blogger = require('../../models/blogger');
const Blognews_2 = require('../../models/blognews');

module.exports = async function() {
    // 地址
    var page = 'http://yinwang.org';

    return new Promise((resolve, reject) => {
        superagent.get(page).end(async function(err, sres) {

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
            $('.list-group-item').each(function(i, ele) {
                let title = $('a', ele).text();
                let link = $('a', ele).attr('href');

                // for test
                // let link = "http://yinwang.org/blog-cn/2016/10/12/compiler-bug";
                // let patt = /blog-cn\/(\d{4}\/\d{1,2}\/\d{0,2})/g;
                // let date = patt.exec(link)[1];

                let patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;
                let date = patt.exec(link)[0];

                // 时间对比 (todo)
                if (new Date(date) > new Date('2016/11/15')) {
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
            Blognews_2.create(newsArray, function(err) {
                if (err) {
                    return;
                }
                var docs = Array.prototype.slice.call(arguments, 1);
                resolve(docs);
                // docs 就是才创建的所有记录
            });

            evtProxyObj.emit('yiwang_indexpage_finished', 'get yinwang.org successful');
        });
    });

}
