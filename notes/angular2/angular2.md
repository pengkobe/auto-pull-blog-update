# angular2

## 第一步
文档 https://angular.io/docs/ts/latest/quickstart.html
文档(中文翻译) http://www.cnblogs.com/haogj/p/5059170.html
脚手架：https://github.com/AngularClass/angular2-webpack-starter

## 优点
* Angular 2 提供了统一的API用来注入服务、指令，和HTML元素。所有这些内容都会被注入到组件的构造函数里面。所以，Angular 2里面需要学习的API更少。同时你的组件会变得更加容易测试
* 它允许你依赖于接口编程，而不是具体类型。
* 它可以让你的代码更加松耦合。
* 它提升了可测试性。
* Angular 2采用了统一的API来给组件注入依赖。
* Angular 2中的DI机制更加强大。

## material2
地址: https://github.com/angular/material2
官网: https://material.angular.io/

##　@ 家族
* @NgModule
 利用一个元数据对象来告诉Angular如何去编译和运行代码。
 一个模块内部可以包含组件、指令、管道，每个Angular2的应用都至少有一个模块即跟模块。
  - declarations：模块内部Components/Directives/Pipes的列表，声明一下这个模块内部成员
  - providers：指定应用程序的根级别需要使用的service。( 注意区分angular1.x的provider )
    (Angular2中没有模块级别的service，所有在NgModule中声明的Provider都是注册在根级别的Dependency Injector中)
    这样做的好处是，只需要实例化一次就可以解决问题。**如果你不想公共使用，可以在 components 中添加provider(只对自己和所有后代可用) **
  - imports：导入其他module，其它module暴露的出的Components、Directives、Pipes等可以在本module的组件中被使用。
    比如导入CommonModule后就可以使用NgIf、NgFor等指令。
  - exports：用来控制将哪些内部成员暴露给外部使用。导入一个module并不意味着会自动导入这个module内部导入的module所暴露出的公共成员。
    除非导入的这个module把它内部导入的module写到exports中。
  - bootstrap：通常是app启动的根组件，一般只有一个component。bootstrap中的组件会自动被放入到entryComponents中。
  - entryCompoenents: 不会在模板中被引用到的组件。这个属性一般情况下只有ng自己使用，
    一般是bootstrap组件或者路由组件，ng会自动把bootstrap、路由组件放入其中。 除非不通过路由动态将component加入到dom中，
    否则不会用到这个属性。
　　
  ```typescript
  @NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLarge
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
  ```
* @Component,用于组件
* @Injectable,用于service，可作为 constructor 函数参数注入
* @Pipe，在angular1的版本中有“过滤器-filter”的概念，在angular2的版本中换成了pipe（管道）
  ```javascript
  import {Injectable, Inject, Pipe} from 'angular2/core'
  @Pipe({ name: 'customTime' })
  export class CustomTimePipe {

  }
  ```
* @ViewChild("scrollObj") private scrollContainer: ElementRef;用于获取子元素


## 路由
本案例使用 @angular/router
* routerLink：用于指定路由，如```posttable/page/1```,[RouteLink]=['path',param1]
* router-outlet：用于路由加载组件区域，```(activate)='onActivate($event)' (deactivate)='onDeactivate($event)'```
* router:Router:可用于页面跳转```this.router:Router.navigateByUrl("posts/page/"+event.page);```
* activeRoute: ActivatedRoute:可用于获取路由参数```this.activeRoute.params.subscribe(params => {});```
* loadchildren:懒加载
* RouteSnapshot:直接查看示例好了
  ```javascript
   let activatedRouteSnapshot:ActivatedRouteSnapshot=this.activatedRoute.snapshot;
   let routerState: RouterState = this.router.routerState;
   let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

   console.log(activatedRouteSnapshot);
   console.log(routerState);
   console.log(routerStateSnapshot);

   // 如果是从/login这个URL进行的登录，什么都不做
   if(routerStateSnapshot.url.indexOf("/login")==-1){
       alert("用户登录成功，可以隐藏登录面板了！");
   }
  ```
  ionic2 使用 DeepLinker

## Angular Core
* ApplicationRef
  其作用是用来监听ngZone中的onTurnDone事件，不论何时只要触发这个事件，那么将会执行一个tick()方法用来告诉Angular去执行变化监测。
  参考:https://toutiao.io/posts/6qc4md/preview

# @Types
在 Typescript 2.0 之后，TypeScript 将会默认的查看 ./node_modules/@types 文件夹，自动从这里来获取模块的类型定义，当然了，你需要独立安装这个类型定义。

## 发现问题
1. 怎么引入第三方模块


## 我所遇见的不同
### 强类型/强约束
### 不再纠结样式文件
### 和市场对接，webpack/state
### hmr
其可以实现可以实现动态刷新而不丢失store，本项目在 webpack.common.js 中添加如下配置
```
{
    test: /\.ts$/,
    use: [
      '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd
      'awesome-typescript-loader',
      'angular2-template-loader',
      'angular2-router-loader'
    ]
     exclude: [/\.(spec|e2e)\.ts$/]
}
```
main.browser.ts 中做初始化加载启动模块
app.module.ts 中配置加载逻辑

```javascript
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
```

* github地址:[hmr-Hot Module Replacement](https://github.com/AngularClass/angular2-hmr)
* 教程:[[译] Webpack 用来做模块热替换(hot module replacement) by 题叶](https://segmentfault.com/a/1190000003872635)



## 开始
* 创建开发环境
* 为我们的应用编写 root component
* 启动 root component 控制主页面
* 编写主页面 (index.html)

### 试用列表
1. [HTTP](https://angular.io/docs/ts/latest/guide/server-communication.html#!#http-client)


## 错误
1. node_modules\typescript\lib 未指向有效的 tsserver 安装。将禁用 TypeScript 语言功能。
   方案: http://www.cnblogs.com/junxian_chen/p/5914012.html
2. webpack出现一系列报错



## 学习资料
*《Angular 2.x 从0到1》
https://gold.xitu.io/user/578e6f3c0a2b580068609665
* 博客园博主这个系列教程不错: http://www.cnblogs.com/haogj/
* https://github.com/jackhutu/jackblog-ionic2
