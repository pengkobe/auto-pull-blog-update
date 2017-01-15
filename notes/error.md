# 报错记录

## TypeError: Cannot read property 'exclude' of undefined at XXX
我在 windows 上运行通过，结果通过 git clone 在 mac 上安装插件并运行时报这个错，
后来在[网上](http://www.cnblogs.com/czaiz/p/6278191.html)发现时版本有点旧，
于是从 2.0.6 升级到了 2.0.10。结果运行通过。
> 听说升级到到 2.0.1x 也会有这个问题，注意不要版本太高了。

## No component factory found for XXXComponent
参考链接:https://github.com/angular/angular/issues/11030

新添加的模块必须在 app.module.ts 中进行注册
1. 在 declarations 中添加该模块
2. 在 entryComponents 中添加该模块
3. 然后才可以用
4. 注意:在 app.routes.ts 中已经加过的模块就不定要放在 entryComponents 中了？
5. 一定要在入口模块中添加？在引用组件中添加行不通？
