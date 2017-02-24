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

## Subject
Subject是一类特殊的Observable，它可以向多个Observer多路推送数值。
普通的Observable并不具备多路推送的能力（每一个Observer都有自己独立的执行环境），而Subject可以共享一个执行环境。
使用方式1:
```javascript
var observable = Rx.Observable.from([1, 2, 3]);
// 你可以传递Subject来订阅observabl
observable.subscribe(subject); 
```
### 特性
* Subject的内部实现中，并不会在被订阅（ subscribe ）后创建新的执行环境。
  它仅仅会把新的Observer注册在由它本身维护的Observer列表中，这和其他语言、库中的 addListener 机制类似。  
* Subject同样也是一个由 next(v) ， error(e) ，和 complete() 这些方法组成的对象。调用 next(theValue) 方法后，
  Subject会向所有已经在其上注册的Observer多路推送 theValue 。

### 多路推送的Observable
multicast 方法返回一个类似于Observable的可观察对象，但是在其被订阅后，它会表现Subject的特性。
```javascript
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// 通过`subject.subscribe({...})`订阅Subject的Observer：
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// 让Subject从数据源订阅开始生效：
multicasted.connect();
```

### 引用计数
refCount 使得多路推送的Observable在被订阅后自动执行，在所有观察者取消订阅后，停止执行。

### BehaviorSubject
BehaviorSubject 是Subject的一个衍生类，具有“最新的值”的概念。它总是保存最近向数据消费者发送的值，
当一个Observer订阅后，它会即刻从 BehaviorSubject 收到“最新的值”。
```javascript

subject.next(1);
subject.next(2);
// 执行到这里会输出2
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});
subject.next(3);
```

### ReplaySubject
如同于 BehaviorSubject 是 Subject 的子类。通过 ReplaySubject 可以向新的订阅者推送旧数值，
就像一个录像机 ReplaySubject 可以记录Observable的一部分状态（过去时间内推送的值）。

### AsyncSubject
AsyncSubject是Subject的另外一个衍生类，Observable仅会在执行完成后，推送执行环境中的最后一个值。


## 参考
* [RxJS 教程](https://segmentfault.com/a/1190000004293922) by  caolixiang
https://gist.github.com/staltz/868e7e9bc2a7b8c1f754  
* [Rx--隐藏在Angular 2.x中利剑](https://gold.xitu.io/post/5860f4f461ff4b006ce9255f)
* [RxJS 核心概念之Subject](http://www.open-open.com/lib/view/open1462525661610.html)
