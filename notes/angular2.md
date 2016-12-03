# angular2

## 第一步
文档 https://angular.io/docs/ts/latest/quickstart.html
脚手架：https://github.com/AngularClass/angular2-webpack-starter


## material2
地址: https://github.com/angular/material2    
官网: https://material.angular.io/  

##　@ 家族
* @NgModule
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


## 路由
本案例使用 @angular/router  


## 我所遇见的不同
1. 强类型/强约束
2. 不在纠结样式文件
3. 和市场对接，webpack/state/[hmr](https://github.com/AngularClass/angular2-hmr)

## 错误
1. node_modules\typescript\lib 未指向有效的 tsserver 安装。将禁用 TypeScript 语言功能。
   方案: http://www.cnblogs.com/junxian_chen/p/5914012.html
2. webpack出现一系列报错