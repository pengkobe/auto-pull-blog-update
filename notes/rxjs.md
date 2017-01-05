# RxJS
> 微软的 Rx 定义 "Rx = Observables + LINQ + Schedulers",RP 提高了编码的抽象程度，
你可以更好地关注在商业逻辑中各种事件的联系避免大量细节而琐碎的实现，使得编码更加简洁。

## 关键词
1. merge/combineLatest
2. map/flatmap
3. startWith/just/create/of

## Observable
Doc : http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
1. 创建
2. 订阅
3. 执行
4. 终止

## 请求响应
**最简单示例**

```javascript
var requestStream = Rx.Observable.just('https://api.github.com/users');
requestStream.subscribe(function(requestUrl) {
  // 执行异步请求
  jQuery.getJSON(requestUrl, function(responseData) {
    // ...
  });
}

```

**jQuery流**

```javascript
requestStream.subscribe(function(requestUrl) {
  // 执行异步请求
  var responseStream = Rx.Observable.create(function (observer) {
    jQuery.getJSON(requestUrl)
    .done(function(response) { observer.onNext(response); })
    .fail(function(jqXHR, status, error) { observer.onError(error); })
    .always(function() { observer.onCompleted(); });
  });

  responseStream.subscribe(function(response) {
    // 业务逻辑
  });
}
```

**promise流**

```javascript
var responseMetastream = requestStream
  .map(function(requestUrl) {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  });

responseStream.subscribe(function(response) {
  // 在浏览器中渲染响应数据的逻辑
});
```

## 完整代码示例
1. startWith null:开始为空白
2. 刷新按钮点击时空白，请求回来后再填充值

```javascript
var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var closeButton1 = document.querySelector('.close1');
var close1ClickStream = Rx.Observable.fromEvent(closeButton1, 'click');
// close2 和 close3 作为练习

// startWith(x) 都会把x作为这个流的启示输入并发射出来
var requestStream = refreshClickStream.startWith('startup click')
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + randomOffset;
  });

// 如果流A中包含了若干其他流，在流A上调用flatMap()函数，将会发射其他流的值，并将发射的所有值组合生成新的流
var responseStream = requestStream
  .flatMap(function (requestUrl) {
    return Rx.Observable.fromPromise($.ajax({url: requestUrl}));
  });

var suggestion1Stream = close1ClickStream.startWith('startup click')
  // 是一个同步操作
  .combineLatest(responseStream,
    function(click, listUsers) {
      return listUsers[Math.floor(Math.random()*listUsers.length)];
    }
  )
  .merge( // 监听刷新流
    // 返回null,指示得清空 dom
    refreshClickStream.map(function(){ return null; })
  )
  .startWith(null);
// suggestion2Stream 和 suggestion3Stream 作为练习

suggestion1Stream.subscribe(function(suggestion) {
  if (suggestion === null) {
    // 隐藏一个用户的DOM元素
  }
  else {
    // 渲染一个新的推荐用户的DOM元素
  }
});
```


## 参考
* [RxJS 教程](https://segmentfault.com/a/1190000004293922) by  caolixiang
https://gist.github.com/staltz/868e7e9bc2a7b8c1f754  
* [Rx--隐藏在Angular 2.x中利剑](https://gold.xitu.io/post/5860f4f461ff4b006ce9255f)
