# angular2高级特性
> 多看十万个为什么，可以理解更具体！

## Query
Query会解决开发者在Angular 1中面临的以下问题：
* pane总是有顺序的。
* 当发生变化的时候，QueryList会通知tab组件。
* Pane没有必要知道Tab的存在。这样Pane组件会更容易测试和复用。

## useClass
创建并返回一个指令类的新实例,使用该技术来为公共或默认类提供备选实现。该替代品能实现一个不同的策略，比如拓展默认类或者在测试的时候假冒真实类。

## 数据流
* ng2为单向数据流，速度快。
* 组件树:angular2-dependencies-graph


## NgModule
可以做懒加载,可以结合路由(path/loadchildren)使用，打包到一个js。



## 参考
* [【翻译】对比Angular1和Angular2中的依赖注入](https://my.oschina.net/mumu/blog/775695?utm_source=tuicool)
