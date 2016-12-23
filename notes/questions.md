# 问题记录
1. package.json 写法 http://www.cnblogs.com/tzyy/p/5193811.html
2. tsconfig.json 写法
3. [karma](http://karma-runner.github.io/1.0/index.html), AngularJS TEAM 开发的测试控制框架
   - Angular1.x 参考: http://www.cnblogs.com/towersxu/p/4600298.html
4. webpack
   - http://pinkyjie.com/2016/03/05/webpack-tips/
   -
5. karma + webpack
6. 持续集成( TravisCI vs Jenkins )
   - codecov:可以部署到 github 上
   - 错误日志
     + [Property 'map' does not exist on type 'Observable<Response>](http://stackoverflow.com/questions/37208801/property-map-does-not-exist-on-type-observableresponse)
 - http://pinkyjie.com/2016/02/27/continuous-integration-with-travis-ci/
 - ruanyf repo：JS-Training
 7. 测试
    - e2e ( [Sauce Labs](https://saucelabs.com/) )
    - jasmine:单元测试
    - mocha
    - protractor ( PageObject )
    - PhantomJS
8. config
   - github-deploy/
     + index.js
   - html-elements-plugin/
     + index.js
   - empty.js
   - head-config.common.js
     头文件，图标等等...
   - helpers.js
     辅助库文件
   - karma.conf.js
     基于Node.js的JavaScript测试执行过程管理工具（Test   Runner）。该工具可用于测试所有主流Web浏览器，也可集成到CI（Continuous   integration）工具，也可和其他代码编辑器一起使用。这个测试工具的一个强大特性就是，它可以监控(Watch)  文件的变化，然后自行执行，通过console.log显示测试结果
   - protracor.conf.js
     protractor UI测试
   - spec-bundle.js
     为测试打包
   - webpack.common.js
     公用部分
   - webpack.dev.js
     开发环境
   - webpack.github-deploy.js
     github自动部署
   - webpack.prod.js
     生产环境
   - webpack.test.js
     测试环境
