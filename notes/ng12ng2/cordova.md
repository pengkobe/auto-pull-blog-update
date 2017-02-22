# Cordova
ionic2 引进了 ionic-native,去掉了以前的构建方式，当前插件的安装方式并没变，还是需要手动进行安装。  
文档:http://ionicframework.com/docs/v2/native/  

## 细节
* isIOS 变成 is("ios")
* cordova.plugins.notification.local 变成 Localnotification,注意属性都是静态类型。
* 并不支持：com.applurk.cordova-screen-locker 


## ionic-native
文档:http://ionicframework.com/docs/v2/native/  
* import { Keyboard } from 'ionic-native';


## 案例
安装
```bash
npm install --save ionic-native
ionic plugin add cordova-plugin-datepicker
```
使用
```javascript
import {DatePicker} from 'ionic-native';
constructor(platform: Platform) {
  platform.ready().then(() => {
    let options = {
      date: new Date(),
      mode: 'date'
    }

    DatePicker.show(options).then(
      date => {
        alert('Selected date: ' + date);
      },
      error => {
        alert('Error: ' + error);
      }
    );
  });
}
// 上述代码可以替换
if (window.cordova) {}
```
参考链接:http://stackoverflow.com/questions/35815279/ionic-2-datepicker