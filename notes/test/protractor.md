## protractor
protractor 用来做端对端测试
教程少的可怜，找到一些将就着看吧：
* http://iamtutu.com/2014/09/30/0930-protractor/

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
```


