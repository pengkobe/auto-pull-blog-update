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
    // 常规的错误处理
    if (err) {
      console.log('get yuguo.us err!\n', err);
      reject(err);
      return;
    }

    // 获取最新博文时间
    let blogmodel = await Blogger.find({
        name: 'yuguo'
      })
      .select('name createTime url taskjs lastUpdateTime')
      .exec().catch(err => {
        utils.logger.error(err);
      });

    if (!blogmodel.length || blogmodel.length == 0) {
      reject("no blogger!");
      return;
    } else {
      //console.log('yuguo.lastUpdateTime:', new Date(date) > blogmodel[0].lastUpdateTime);
    }
    let blogger = blogmodel[0];

    // 提取作者博文链接，注意去重
    let $ = cheerio.load(sres.text);
    let newsArray = [];

    // 获取欧文
    $('li.post').each(function (i, ele) {
      let title = $('a>span', ele).text();
      let rawLink = $('a', ele).attr('href');
      let link = rawLink.indexOf("http") == -1 ? ('https://yuguo.us/' + $('a', ele).attr('href')) : rawLink;
      let date = $('a>time', ele).attr("datetime");

      // 时间对比 
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

    // 无更新
    if (newsArray.length == 0) {
      resolve([]);
      return;
    }

    // 存入数据库
    Blognews_2.create(newsArray, function (err) {
      if (err) {
        reject("store article err！");
        return;
      }
      var docs = Array.prototype.slice.call(arguments, 1);
      resolve(docs);
    });

    // 更新最后拉取时间
    blogger.lastUpdateTime = new Date();
    await Blogger.update({
        _id: blogger._id
      }, blogger)
      .exec().catch(err => {
        utils.logger.error(err);
      });
  });
}
