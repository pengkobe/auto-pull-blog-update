# RxJS
就是 Promise 的火力增强版

## 用途
* http
* 事件处理

## 与 Promise 的三个不同点
* Observable 可以中途取消:unsubscribe
* Observable 可以持续发射很多值，直接调用 next 就可以了
* Observable 提供了很多工具函数(非常强大)
  + filter
  + map
  + ...


## 特性
* debounce( time ):可以去除重复点击引起的问题
* distinctUtilChange:值没变不发布

## http
let data = new UrlSearchParams();
data.append();


## Subject
主题订阅


## 参考
参考文档, PPT 上有最好的文档链接( 111 页? )

