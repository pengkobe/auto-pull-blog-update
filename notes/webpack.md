**最近有个项目需要用到webpack，在这里记录一些难点与一些概念性的知识。**
>  webpack其实和 grunt/gulp 根本不是一种东西，
它不是一个构建工具，而是 module bundler，webpack 就是根据 module 文件间的依赖将所有module打包（bundle）起来。
其有点是使用 loader 的概念让配置更加容易，再也不用和一堆文件路径打交道了。  

Doc:https://webpack.github.io/docs/configuration.html  

对我来说，以前还需要用 bower 装前端插件，现在都可以使用 npm 进行管理了 

### Why webpack
* 将依赖树拆分成按需加载的块
* 初始化加载的耗时尽量少
* 各种静态资源都可以视作模块
* 将第三方库整合成模块的能力
* 可以自定义打包逻辑的能力
* 适合大项目，无论是单页还是多页的 Web 应用

### 开发环境
* webpack-dev-server
  > 它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。

### 错误处理
* 打印 ```webpack --display-error-details```
* Webpack 的配置提供了 resolve 和 resolveLoader 参数来设置模块解析的处理细节，resolve 用来配置应用层的模块（要被打包的模块）解析，resolveLoader 用来配置 loader 模块的解析。


### 项目 webpack 文件
* webpack.common.js,公用部分

* webpack.dev.js,开发

* webpack.github-deploy.js,github部署

* webpack.prod.js,发布

* webpack.test.js,测试


### 项目使用插件列表
1. common
    * assets-webpack-plugin，[link](https://github.com/kossnocorp/assets-webpack-plugin)
      Webpack plugin that emits a json file with assets paths.
    * NormalModuleReplacementPlugin,匹配resourceRegExp，替换为newResource
    * ContextReplacementPlugin,替换上下文的插件
    * CommonsChunkPlugin,多个 html共用一个js文件(chunk)
    * copy-webpack-plugin
    * awesome-typescript-loader
      - ForkCheckerPlugin
    * html-webpack-plugin
    * LoaderOptionsPlugin
    * script-ext-html-webpack-plugin,Enhances html-webpack-plugin functionality with async and defer attributes for script elements
2. dev
    * NamedModulesPlugin  ( 暂时无用 )
    * LoaderOptionsPlugin ( Repeat )
    * DefinePlugin
3. prod
   * DedupePlugin，去重插件
   * DefinePlugin ( Repeat )
   * IgnorePlugin  ( 暂时无用 )
   * LoaderOptionsPlugin ( Repeat )
   * NormalModuleReplacementPlugin ( Repeat )
   * ProvidePlugin，使得 jquery 可暴露到全局
   * UglifyJsPlugin，压缩
   * WebpackMd5Hash
   * V8LazyParseWebpackPlugin
     > This is a webpack plugin designed to exploit the V8 engines treatment of functions with parens wrapped around them. This lazy loads the parsing decreasing initial load time.
4. test
   * ProvidePlugin ( Repeat )
   * DefinePlugin ( Repeat )
   * LoaderOptionsPlugin ( Repeat )
   * ContextReplacementPlugin ( Repeat )

#### 其它插件
* webpack-vendor-chunk-plugin：Removes the runtime code from a webpack chunk.


### devDependencies & dependencies
前者用来声明一些build过程中需要用的到一些构建工具，而后者用来声明开发使用到的前端库。

### 配置
webpack的配置可以说就是module和plugins的配置，module里主要就是配置各种loaders，
没啥可说的，你要require什么类型的文件就去搜相应的loader就好，
这一节主要说后面的这个：plugins的配置。webpack支持非常多的插件，详见官方插件列表。

### 暴露jQuery
样，当webpack碰到require的第三方库中出现全局的$、jQeury和window.jQuery时，就会使用node_module下jquery包export出来的东西了。

```javascript
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
})
```

### 定义全局标识
在命令行传参可以指定是时开发还是发布，

```javascript
// 依赖yargs
args = require('yargs').argv;
new webpack.DefinePlugin({
    __PROD__: args.prod，
    __MOCK__: args.mock
}),
```
这样在build时传入--prod，则变量__PROD__即为true，传入--mock则__MOCK__为true。
在JS代码中就可以使用类似的判断if (__PROD__) {...}了。


### 输出单独的JS
可以使用webpack内置的*CommonsChunkPlugin*,

* 在entry中定义app和vendor这两个模块

```javascript
entry: {
    app: [
        'source/app/index.js'
    ],
    vendor: [
        'angular',
        'angular-ui-router',
        'angular-animate'
        // ...
    ]
}
```
* 在plugins里使用该插件

```javascript
new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash].js' : 'vendor.js')
```
这样，所有模块中只要有require到vendor数组中定义的这些第三方模块，
那么这些第三方模块都会被统一提取出来，放入vendor.js中去。
在插件的配置中我们还进行了判断，如果是生产环境则给最终生成的文件名加hash。

### 一些有用的工具
* yargs, 便捷的命令行参数处理工具。
* shrinkwrap, 版本号管理工具
* css-loader, 负责将CSS文件变成文本返回，并处理其中的url()和@import()，
* style-loader, 将CSS以style标签的形式插入到页面中去。一般使用的时候这么写：
* copy-webpack-plugin, copy指定文件到指定路径
* html-webpack-plugin, 定义入口HTML文件

### Demo
个人有使用webpack结合vue开发了一个项目:[my-twitter-system](https://github.com/pengkobe/my-twitter-system) ,欢迎start。

###  参考
* http://pinkyjie.com/2016/03/05/webpack-tips/
* 腾讯高级前端工程师赵达 : http://webpackdoc.com/
* 常用 loader 与 plugin : https://segmentfault.com/a/1190000005106383
