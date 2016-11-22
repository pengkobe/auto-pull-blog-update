/**
 * demo from github
 */
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var url = require('url');

var eventproxy = require('eventproxy');
var evtProxyObj = eventproxy();

var baseUrl = 'http://yinwang.org';
var pageUrls = [];
pageUrls.push(baseUrl);

var authorUrls = [];

// 命令 evtProxyObj 重复监听 emit事件(get_topic_html) 3 次再行动
evtProxyObj.after('get_topic_html', pageUrls.length, function (evtProxyObjs) {
    var concurrencyCount = 0;
    // 利用callback函数将结果返回去，然后在结果中取出整个结果数组。
    var fetchUrl = function (myurl, callback) {
        var fetchStart = new Date().getTime();
        concurrencyCount++;
        console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', myurl);
        superagent.get(myurl)
            .end(function (err, ssres) {
                if (err) {
                    callback(err, myurl + ' error happened!');
                }
                callback(null, result);
            });

    };
    // 控制最大并发数为5，在结果中取出callback返回来的整个结果数组。
    async.mapLimit(authorUrls, 5, function (myurl, callback) {
        fetchUrl(myurl, callback);
    }, function (err, result) {
        console.log('=========== result: ===========\n', result);
        res.send(result);
    });
});

// 获取每页的链接数组，这里不要用emit返回了，因为我们获得的已经是一个数组了。
pageUrls.forEach(function (page) {
    superagent.get(page).end(function (err, sres) {
        // 常规的错误处理
        if (err) {
            return next(err);
        }
        console.log('get authorUrls successful!\n', authorUrls);
        evtProxyObj.emit('get_topic_html', 'get authorUrls successful');
    });
});