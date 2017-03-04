# my-web-crawler
![travis-ci](https://travis-ci.org/pengkobe/my-web-crawler.svg?branch=master)
> auto pull blog update from blogger you care about.

## How to use
### for the one who have no JS programming experience
you can submit your requirement to me.($5 per one).

### for the one who knows JS
you can simply submit your code to me.
crawling yinwang.org for example：

```javascript
/* __pulldata___ is the data your want to store
   starts with '__',ends with '___'
   you must  at least have 3 field：
   1. _publishTime_
   2. _title_
   3. _link_
*/

__pulldata___ = [];
$('.list-group-item').each(function (i, ele) {
      var title = $('a', ele).text();
      var link = $('a', ele).attr('href');
      var patt = /\d{4}\/\d{1,2}\/\d{0,2}/g;
      var date = patt.exec(link)[0];

    __pulldata___.push({
        _title_: title,
        _link_: link,
        _publishTime_: date
    });
});
```

## Demo
* http://115.29.51.196:3001
* https://pengkobe.github.io/my-web-crawler

## License
MIT@yipeng.info


