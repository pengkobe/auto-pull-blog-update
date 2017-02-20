## protractor
protractor 用来做端对端测试
教程少的可怜，找到一些将就着看吧：
* http://iamtutu.com/2014/09/30/0930-protractor/

## 测依赖
* Selenium Server: 一个后端jar包,用来负责跟浏览器驱动进行通讯。
* WebDriver browser drivers: 用来驱动浏览器打开网站,并与Selenium Server通讯.
* WebDriver APIs:
   由Selenium提供给前端测试用的相关API,protractor在此基础之上,针对angular程序的特点,提供了一些适合angular程序的API.

## 区分Karma
这里 describe 和 it 语法来自 Jasmine 框架。browser 由 Protractor 全局创建的，他可以用来执行浏览器级别的命令，例如用 browser 导航。

## element & by
* element 用 sendKeys 来给 <input> 输入值，click 来点击按钮，getText 来返回元素的内容。
  - 用 element.all 处理，这个方法会返回一个 ElementArrayFinder
  - element.all(by.repeater('result in memory'));
* by 元素创建了定位仪。
  - by.model('first') 来查找元素 ng-model="first"。
  - by.id('gobutton') 来根据给定的id查找。
  - by.binding('latest') 来发现绑定了latest变量的元素，即 { {latest} }

## 一次跑多个浏览器
```javascript
// 简化版
// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
}
// 复杂版 : https://jackhu.top/article/5607fa9d10f611091d0933c3
// protractor 配置
exports.config = {
  //每个运行在浏览器的脚本文件超时时间,单位毫秒.
  allScriptsTimeout: 11000,
  //使用的测试框架
  framework: 'jasmine2',
  //测试的文件路径
  specs: ['test_e2e/**/*.spec.js'],
  //程序的基本URL,protractor.get()将以它作为相为路径
  baseUrl: 'http://localhost:3000',
  //浏览器配置
  capabilities: {
    browserName: 'chrome'
  },
  //多浏览器配置
  // multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }]
  // jasmine配置
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  //selenium及浏览器驱动文件路径
  seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  chromeDriver: 'node_modules/protractor/selenium/chromedriver'
}
```

## 参考资料


