# Jasmine
单元测试的模式基本分为：TDD 和 BDD。
Jasmine为 BDD(行为驱动开发)

## 重要方法

### Spy
* createSpy：假如没有函数可以追踪，我们可以自己创建一个空的Spy。
* createSpyObj：模拟多个函数调用，传入一个字符串数组，返回一个对象传入的所有字符串都将对应一个属性，每个属性为一个Spy。
* ```spyOn(foo, 'setBar');foo.setBar(123);``` 模拟调用，因此不会执行实际的代码
* ```spyOn().and.callThrough()```，除了要完成对函数调用的跟踪，同时也需要执行实际的代码。
* ```spyOn(foo, "getBar").and.returnValue(745);``` 强制指定函数的返回值。
* ```and.callFake()```,指定一个假的自定义函数来执行
* ```and.throwError()```,模拟异常抛出

其他追踪属性：

calls：对于被Spy的函数的调用，都可以在calls属性中跟踪。

* .calls.any(): 被Spy的函数一旦被调用过，则返回true，否则为false；
* .calls.count(): 返回被Spy的函数的被调用次数；
* .calls.argsFor(index): 返回被Spy的函数的调用参数，以index来指定参数；
* .calls.allArgs():返回被Spy的函数的所有调用参数；
* .calls.all(): 返回calls的上下文，这将返回当前calls的整个实例数据；
* .calls.mostRecent(): 返回calls中追踪的最近一次的请求数据；
* .calls.first(): 返回calls中追踪的第一次请求的数据；
* .object: 当调用all()，mostRecent()，first()方法时，返回对象的object属性返回的是当前上下文对象；
* .calls.reset(): 重置Spy的所有追踪数据；

## 其他匹配方式
* jasmine.any：Jasmine将判断期望值和真实值的构造器是否相同，若相同则返回true。
* jasmine.anything：只要不是null或undefined的值，若不是则返回true

## 模拟时间
jasmine.clock()

## 异步支持
* done();

## Angular 相关
* ngModel.$setViewValue

## 问题
Angualar 怎么调试 & 绑定的方法,看了一篇文章后找到了答案

```javascript
 expect(elm.isolateScope().isOverMin()).toBeFalsy();
```
原文地址: [AngularJs directive 的单元测试方法](https://segmentfault.com/a/1190000000486421)
源代码地址:https://github.com/revolunet/angular-stepper/blob/master/src/angular-stepper.spec.js


## 一些教程
* 官网：http://jasmine.github.io/2.3/introduction.html
* Jasmine 使用教程:http://www.jianshu.com/p/a8ee7fb47512  ( 非常简单的流水账 )
* Jasmine入门(下):http://www.cnblogs.com/wushangjue/p/4575826.html  ( Api搬过来而已 )
