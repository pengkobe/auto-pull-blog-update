# 阅读总结：http://www.cnblogs.com/haogj/p/5059170.html

## 最终文件结构（ 5min部分 ）：
```bash
angular2-quickstart
node_modules
app
     app.component.ts
     boot.ts
index.html
package.json
tsconfig.json
``` 

## 添加需要的库
package.json
{
  "name": "angular2-quickstart",
  "version": "1.0.0",
  "scripts": {
    "tsc": "tsc",
    "tsc:w": "tsc -w",
    "lite": "lite-server",
    "start": "concurrent \"npm run tsc:w\" \"npm run lite\" "
  },
  "license": "ISC",
  "dependencies": {
    "angular2": "2.0.0-beta.0",
    "systemjs": "0.19.6",
    "es6-promise": "^3.0.2",
    "es6-shim": "^0.33.3",
    "reflect-metadata": "0.1.2",
    "rxjs": "5.0.0-beta.0",
    "zone.js": "0.5.10"
  },
  "devDependencies": {
    "concurrently": "^1.0.0",
    "lite-server": "^1.3.1",
    "typescript": "^1.7.3"
  }
}


## 配置 TypeScript
``` 
tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "system",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  "exclude": [
    "node_modules"
  ]
}
``` 

## 第一个 Angular Component
Component 是 Angular 中的基础概念，一个 Component 管理一个视图 View

创建 app/app.component.ts
```
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }
```

### Modules
Angular 应用是模块化的，其中包含一系列各有用途的独立文件。

多数应用文件导出一些东西，类似 Component，我们的 app.component 导出 AppComponent.
app/app.component.ts (export)
export class AppComponent { }
这个导出的行为将这个文件转化为了一个模块 module，文件的名称（不包含扩展名）通常作为模块的名称，
根据这个规则，'app.component' 就是我们第一个模块的名称。


### Component Metadata
在我们为 Class 提供元数据之后，它才会成为 Angular Component. Angular 需要元数据来理解如何构造视图，以及这个组件如何同应用中的其他部分进行互动。

我们使用 Angular 提供的 Component 函数来定义 Component 的元数据，通过导入 Angular 的基础库 angular2/core， 我们可以访问这个函数。 

import {Component} from 'angular2/core';
在 TypeScript 中，我们将这个函数应用到类的前缀来装饰这个类，使用 @ 符号，在组件类的上方调用这个函数。

app/app.component.ts (metadata)
@Component({
    selector: 'my-app', // 编写 index.html 的时候，我们需要这些信息
    template: '<h1>My First Angular 2 App</h1>'
})
@Component 告诉 Angular 这个类是一个组件 Componet，配置对象传递给了 @Compoent 函数，包含两个字段，selector 和 template.



###  app/boot.ts
import {bootstrap}  from 'angular2/platform/browser'
import {AppComponent} from './app.component'

bootstrap(AppComponent);
我们需要两件事情来启动应用：

### Angular 的浏览器函数 bootstrap
我们把它们导入进来，然后调用 bootatrap，将 AppComponent 组件作为参数传递给 bootstrap.

* 可以在 appendix below 中学习为什么我们从 angular2/platform/browser 导入 bootstrap ，以及为什么要创建独立的 boot.ts 文件。
* 如果你看到 Loading... ，而不是上述内容，查看：Browser ES6 support appendix.
* Lite-server 

### app/app.component.ts

import {Component} from 'angular2/core';
@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }
 

### app/boot.ts

import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
bootstrap(AppComponent);
 

### index.html
``` 
<html>
    <head>
        <title>Angular 2 QuickStart</title>
        <!-- 1. Load libraries -->
        <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="node_modules/rxjs/bundles/Rx.js"></script>
        <script src="node_modules/angular2/bundles/angular2.dev.js"></script>
        <!-- 2. Configure SystemJS 什么是SystemJS?-->
        <script>
            System.config({
                packages: {
                    app: {
                        format: 'register',
                        defaultExtension: 'js'
                    }
                }
            });
            System.import('app/boot')
                  .then(null, console.error.bind(console));
        </script>
    </head>
    <!-- 3. Display the application -->
    <body>
        <my-app>Loading...</my-app>
    </body>
</html>
``` 


## 更大的目标
Browser ES6 support  
Angular 2 基于一些 ES2015 特性，试着在 index.html 文件的其他脚本之前加载垫片库。  
<script src="node_modules/es6-shim/es6-shim.js"></script>

### npm start
我们可以使用下面的方式来执行 npm 脚本： npm run + script-name. 下面是三个脚本的目的:
* npm run tsc - 执行一次 TypeScript 编译器 
* npm run tsc:w - 在监控模式执行 TypeScript 编译器; 进程保持执行。等到 TypeScript 文件变化之后，重新编译它。
* npm run lite - 执行 lite-server, 一个轻量级的，静态文件服务器。, 由 John Papa 编写和维护，对 Angular 使用路由的应用有着杰出的支持.
我们经常在一系列的 gyp 错误信息之后看到 Npm 的警告信息。忽略它们吧，包可能试图使用 node-gyp 重新编译自己。如果重新编译失败，
包会进行恢复（典型地使用上一个 build 版本）而且正常工作。 

### noImplicitAny 
* 当 noImplicitAny 标志为 false 的时候，如果编译器不能根据变量的使用来推断变量的类型，直接默认为 any 类型。这就是为什么称为 "implicitly any "，
* 当 noImplicitAny 标志为 true 的时候，TypeScript 编译器不能推断类型，它仍然生成 JavaScript 文件，但是报告一个错误。
如果我们将 noImplicitAny 标志设置为 true，我们会得到一个显式的索引错误。如果我们觉得没有用，可以使用下面的标志来抑制它们。  
"suppressImplicitAnyIndexErrors":true

### SystemJS
QuickStart 使用 SystemJS 加载应用和库模块。还有一些替代库页可以做的很好比如著名的 webpack 。SystemJS 在需要简单清楚的时候是一个好的选择。
* 我们建议你精通所选择的加载器。
<script>
  System.config({
    packages: {        
      app: {
        format: 'register',
        defaultExtension: 'js'
      }
    }
  });
  System.import('app/boot')
        .then(null, console.error.bind(console));
</script>

### boot.ts (excerpt)
import {AppComponent} from './app.component'
注意，from 后面的模块名称没有包含扩展名，package 的配置告诉 SystemJS 默认的扩展名是 ‘js'，JavaScript 文件。
System.import 调用告诉 SystemJS 导入 boot 文件（boot.js ... 等到编译之后，记得吗？）
boot 是我们告诉 Angular 启动应用的地方，我们同时也捕获和记录启动中的错误信息到控制台中。
我们从 angular2/platform/browser 中导入 bootstrap 函数，而不是 angular2/core, 有一些原因。

我们只在希望跨所有平台目标的时候调用 "core" ，是的，多数 Angular 应用仅仅运行在浏览器中，多数情况下我们调用这个库的函数，
如果我们总是为浏览器的话，这是一个很好的选择。
为什么创建独立的 boot.ts 文件?
boot.ts 文件很小，仅仅是一个 QuickStart，我们可以将仅有的几行合并到 app.component 文件中，减少一些复杂度。
下面的原因使我们没有这样做：
* 很容易写好。
* 可测试
* 可重用
* 关注点分离
* 可以学到更多的导入和导出
* 容易


### Testability
即使我们知道我们永远不会测试这个 QuckStart ，我们也应该从一开始考虑到可测试性。
如果同一个组件文件中包含了 bootstrap 调用的话，它是很难测试的。一旦我们加载这个组件文件进行测试，
bootstrap 函数就会试图加载应用到浏览器中
将 bootstrap 功能移到独立的 boot.ts 文件中，可以避免这个错误，保持组件文件的清晰。

### Reusability
在应用开发过程中，我们重构，重命名文件，如果文件中调用了 bootstrap，
我们不能就不能做这些事情。我们不能移动，不能在其它应用中重用组件，不能为了更好的性能在服务区端预先渲染。

