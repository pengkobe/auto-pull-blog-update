# ionic
由于项目基于 ionic，这里需对 ionic 基于 angular2 做的升级进行一些记录

## 细节项
* @Page,升级后不见了。

## 事件
参考链接：http://ionicframework.com/docs/v2/api/util/Events/    
```javascript
events.publish('user:created', user, Date.now());
events.subscribe('user:created', (user, time) => {
  // user and time are the same arguments passed in `events.publish(user, time)`
  console.log('Welcome', user, 'at', time);
});
```

## 组件
* ion-slides,看上去没啥变化