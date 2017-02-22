# Cordova
ionic2 引进了 ionic-native,去掉了以前的构建方式。  
文档:http://ionicframework.com/docs/v2/native/

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
```
参考链接:http://stackoverflow.com/questions/35815279/ionic-2-datepicker