## Karma
> 一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该
工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous integration）工具，也可和其他代码编辑器一起使用。
这个测试工具的一个强大特性就是，它可以监控(Watch)文件的变化，然后自行执行，通过console.log显示测试结果。

## Jasmine
单元测试框架(BDD:行为驱动开发)
事实上 Jasmine 是 Junit 的 Javascript 版本。
### suit
```javascript
describe("A suite", function() {
  var foo;
  beforeEach(function() {
    foo = 0;
    foo += 1;
  });

  afterEach(function() {
    foo = 0;
  });

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
```
资料: http://blog.fens.me/nodejs-jasmine-bdd/


## istanbul
代码覆盖率工具


## karma配置
karma.conf.js

```javascript
// 版本1
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['*.js'],
        exclude: ['karma.conf.js'],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false,

        // 代码覆盖率配置项
        reporters: ['progress','coverage'],
        preprocessors : {'src.js': 'coverage'},
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        }
    });
};

```


```javascript
// 版本2:针对angular1.x 参考自:https://jackhu.top/article/56060bda10f611091d0933c1
// Karma configuration
module.exports = function(config) {
  config.set({
    // 根路径,其它相对路径都这它为基准
    basePath: '',
    //使用的测试框架
    frameworks: ['jasmine'],
    //所有浏览器加载的文件路径
    files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'client/**/*.js',
        'client/**/*.html',
        'test_karma/**/*.spec.js'
    ],
    //对angular文件按照依赖注入顺序加载
    angularFilesort: {
      whitelist: [
        'client/**/*.js'
      ]
    },
    // 需要排除的文件
    exclude: [
    ],
    //预处理器,默认只对CoffeeScript预处理,其它的需要装插件,这里对应两个插件
    preprocessors: {
        'client/**/*.js': ['coverage'], //测试覆盖率插件karma-coverage
        'client/**/*.html': ['ng-html2js'] //将angular模板文件转化成$templatecache
    },
    //默认module名称为templates
    ngHtml2JsPreprocessor: {
      stripPrefix: 'client/',
      moduleName: 'templates'
    },
    //测试结果报告,默认只有progress,其它的需要手动添加.
    reporters: ['progress','coverage'],
    //测试覆盖率配置,text-summary在控制台打印, html 生成html文件到指定的dir
    coverageReporter: {
      //type : 'html',
      type:'text-summary',
      dir : 'test_karma_coverage/'
    },
    //默认端口
    port: 9876,
    // 开启关闭有颜色的输出
    colors: true,
    // 输出的日志级别
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // 是否开启自动监控
    autoWatch: false,
    // 运行测试的浏览器,需要安装插件
    browsers: ['Chrome'],
    // 是否只运行一次就退出karma, 通常和autoWatch配合使用,当autoWatch为true时,此处为false
    singleRun: true
  })
}
```

## karma启动
```bash
karma start karma.conf.js
```


## 报错


## 参考
http://blog.fens.me/nodejs-karma-jasmine/





