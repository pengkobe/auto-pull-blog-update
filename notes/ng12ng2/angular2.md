# Angular2 迁移记录
* filter to pipe
* $rootscope/$scope 消失
* Dom操作方式大改
  + ng1直接使用 Angular.element
  + ng2
    ```javascript
    import { DOM } from 'angular2/src/platform/dom/dom_adapter';
    DOM.addClass(DOM.query("body"), 'fixed');
    ```

## 细节项目
* 使用 GlobalService 来代替 $rootscope 
    ```
    $rootscope.key = value
    # 转换为
    globalservice.set(key,value);
    ```
* angular.extend 重写至 Util
* ng-click 修改为 (click)
* ng-class 修改为 (ngClass)
* ng-repeat 使用 ngFor 来替代，track by index 替换为*;$index = index* (个人思考),使用示例:
  ```html
  <!-- cities:数组。c:变量.index:索引 -->
  <div class="ui list" *ngFor="#c of cities;#num = index""> 
        <div class="item">{{num+3}}{{ c }}</div>
  </div>
  ```
