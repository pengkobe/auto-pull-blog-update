# 迁移纪录

## 逐步迁移技巧
* [先做好前期准备，再迁移](http://www.tuicool.com/articles/u2QNje),如用 ES6 写代码
* [迁移，你只需要 5 个步骤](https://github.com/vsavkin/ng1ng2router/tree/ng1_cmp_in_ng2)

## 学习技巧
* 前往 Github 主库，进入到 Demo 目录，查看各个示例（总共也就30、40个组件）
* 看文档，看了示例之后在来看，会好很多，https://angular.cn/docs/ts/latest/tutorial/
* 去 showcase 找找案例，网址: http://showcase.ionicframework.com/apps/top
* CSDN 上有中文文档可下载
* ionic论坛可以解答你的很多疑惑: https://forum.ionicframework.com


## 项目结构不同点
* 不再可以自定义 gulp 任务了，官方解释了为了其自身构建更好的工具
* ngCordova转化为了 Ionic Native 模块
* 没有强制使用路由模块，简化为直接在 Html 中配置，可以使用 push/pop 进行操作，当然也可以建立 Deeplinking
  >  native-style approach to navigation using push/pop style navigation without being bound to URLs
* run方法改变，见下述
* Providers/Services 构建方法改变，只带有全局 Services
* Update Theme( 跟我们没多大关系 )
* 文件结构需要大改

## 文档不同点
* 以前分为 css 组件与 javascript 现在分为 css 组件与 API
* 大部分组件使用方式都已改变


## run方法
实际上相当于 app/app.component 中的
```javascript
platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
```

## 组件设计模式大改，很多都不兼容
### tabs
* 去掉 href
* 去掉子元素 ion-nav-view
* badge 变为 tabBadge
* badge-style  变为 tabBadgeStyle

### ion-nav-bar
* 名称改变为 ion-navbar

### ion-side-menu
v2 不存在该组件，使用 ion-menu 代替

