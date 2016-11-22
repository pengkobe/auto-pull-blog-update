/**
* 抓取 yinwang.org
*/

module.export = function () {
    superagent.get(page).end(function (err, sres) {
        // 获取最新博文时间 (todo)

        // 常规的错误处理
        if (err) {
            return next(err);
        }
        // 提取作者博客链接，注意去重
        var $ = cheerio.load(sres.text);
        var arr = [];
        $('.list-group-item').each(function (i, ele) {
            var title = $('a', ele).text();
            var link = $('a', ele).attr('href');

            // for test
            // var link = "http://yinwang.org/blog-cn/2016/10/12/compiler-bug";
            // var patt = /blog-cn\/(\d{4}\/\d{1,2}\/\d{0,2})/g;
            // var date = patt.exec(link)[1];

            var patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;
            var date = patt.exec(link)[0];

            // 时间对比 (todo)

            // 存入数据库 (todo)

            arr.push({
                title: title,
                link: link,
                date: date
            });
        });
        console.log('get yinwang.org successful!\n', authorUrls);
        evtProxyObj.emit('yiwang_finished', 'get yinwang.org successful');
    });
}
