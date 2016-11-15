//解析操作url
var url = require('url');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var targetUrl = 'https://cnodejs.org/';
superagent.get(targetUrl).end(function (err, res) {
    console.log("superagent:", res);
    var $ = cheerio.load(res.text);
    // 通过 CSS selector 来筛选数据
    $('#topic_list .topic_title').each(function (idx, element) {
        console.log("topic_list:", element);
        var $element = $(element);
        var href = url.resolve(targetUrl, $element.attr('href'));
        console.log("href", href);
    });
});