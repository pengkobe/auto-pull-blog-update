# 第一章：Angular-CLI

## 装包
有些包直接从本地拷贝就行了。
```
#cpm 有些包版本对不上
npm config set proxy ''
```

## 装包
* node-sass:这个包非常让人苦恼
* node-gyp:visual-studio辅助版本


## 用途
```
ng g c myCmp
```

## 属性
* --aot:预编译(ahead of time compilation)
* --prod:发布优化


## 脑图
汤桂川发布的,看着可以对照技能,练完就是专家了。


## 核心架构思想
* DI(来自spring)，可在 构造器中注入，并可带public修饰符，这特性很好。
  + 注射器(父子通信),@Injectable 是 @Component 的子类
  + 每个组件上都有一个 @Inject 实例

## UI Compoent
* primeNG
* ionic 都熟悉吧？
* 推荐开源的 ng-admin

## 怎么部署至 tomcat
前端路由处理404

