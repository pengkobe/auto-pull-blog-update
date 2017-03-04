/**
 * 抓取提交的任务
 */
const cheerio = require('cheerio');
const superagent = require('superagent');

const utils = require('../../utils/index');
const Blogger = require('../../models/blogger');
const Blognews_2 = require('../../models/blognews');
const vm = require('vm');
const util = require('util');


module.exports = async function runTasksFromDB(resolve, reject) {
    console.log('iamhere0:');
    let blogmodel = await Blogger.find({})
        .exec().catch(err => {
            utils.logger.error(err);
            this.throw(500, '内部错误')
        });

    if (!blogmodel.length || blogmodel.length == 0) {
        reject("no blogger!");
        return next(err);
    }
    console.log('iamhere1:');
    for (let m in blogmodel) {
        if (blogmodel[m].taskjs != "" && blogmodel[m].taskjs.indexOf(".js") == -1) {
            console.log('iamhere2:' + blogmodel[m].name);
            let model = blogmodel[m];

            superagent.get(model.url).end(async function(err, sres) {
                try {
                    // 常规的错误处理
                    if (err) {
                        console.log('get ' + model.name + ' err!\n', err);
                        reject(err);
                        return next(err);
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
                        __pulldata___:{}
                    };

                    // eval(model.taskjs);
                    var vmRet = vm.runInNewContext(model.taskjs, sandbox);
                    //console.log('iamhere3xx:' + util.inspect(sandbox));

                    let __pulldata___ =  sandbox.__pulldata___;
                    let newsArray = [];
                    for (let i = 0; i < __pulldata___.length; i++) {
                        // 时间对比 new Date("2016-11-01")
                        if (!model.lastUpdateTime || new Date(__pulldata___[i]._publishTime_) > new Date(model.lastUpdateTime)) {
                            newsArray.push({
                                from: model._id,
                                pullTime: new Date(),
                                publishTime: new Date(__pulldata___[i]._publishTime_),
                                title: __pulldata___[i]._title_,
                                link: __pulldata___[i]._link_,
                                date: __pulldata___[i]._publishTime_,
                            });
                        }
                    }

                    if (newsArray.length == 0) {
                        resolve([]);
                    }

                    console.log(' tasks_from_db: 存入数据库  前!\n', err);
                    // 存入数据库
                    Blognews_2.create(newsArray, function(err) {
                        if (err) {
                            reject("store article err！");
                            return next(err);
                        }
                        var docs = Array.prototype.slice.call(arguments, 1);
                        resolve(docs);
                    });

                    // 更新最后拉取时间
                    model.lastUpdateTime = new Date();
                    await model.update({ _id: model._id }, model)
                        .exec().catch(err => {
                            utils.logger.error(err);
                            this.throw(500, 'Blogger.update错误');
                        });

                } catch (e) {
                    console.log(e);
                }
            });
        }
    }
}
