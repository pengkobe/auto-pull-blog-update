## Karma
> 一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous integration）工具，也可和其他代码编辑器一起使用。这个测试工具的一个强大特性就是，它可以监控(Watch)文件的变化，然后自行执行，通过console.log显示测试结果。

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

## karma启动
```bash
karma start karma.conf.js
```


## 报错


## 参考
http://blog.fens.me/nodejs-karma-jasmine/





