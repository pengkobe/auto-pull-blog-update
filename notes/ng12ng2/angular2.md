# Angular2 迁移记录
* filter to pipe
* $rootscope/$scope 消失
* Dom操作方式大改
  + ng1直接使用 Angular.element
  + ng2
     - (暂不知道咋用)
     ```javascript
     import { DOM } from 'angular2/src/platform/dom/dom_adapter';
     DOM.addClass(DOM.query("body"), 'fixed');
     ```
     - directive中这样用?
     ```javascript
     this.el.nativeElement.style.color=color;
     ```

## 事件机制
以下基本上用的是 broadcast 结合 on 使用( 一定程度上造成了写法的混乱，代码都不见了 )，  
现在是 emit 结合 subcribe 使用。


## 组件/指令
angular2 引入了组件 @component(带模板,相当于1.x中的directive)，细分了两种指令
+ 结构性 ngIf
+ 属性型 ngClass

迁移案例( accordion ):http://angular-tips.com/blog/2015/09/migrating-directives-to-angular-2/  
Angular1.x : http://plnkr.co/edit/tYPUDDJwFMsjWjyDznwt  
Angular2 : http://plnkr.co/edit/Fs4oR956gd6gQmHdFhHS?p=info  
* 再也没有 Controllers 和 Link 函数了.
* Even when the new html syntax is weird at first, makes our directive really straightforward to use.
* 再也没有 =, @ and &.
* Using a parent directive is as easy as injecting it.
* Lot of lifecycle hooks to customize easily our directives.
* 选择器类型更多了.
* 不要在考虑隔离作用域.
* “Transclusion” 的作用体现出来了.


### directive
参考：http://blog.csdn.net/shenlei19911210/article/details/53218074  
elem.nativeElement 对象到底是什么，需要整清楚


## 细节项目
参考链接：https://angular.cn/docs/ts/latest/api/  
* 使用 GlobalService 来代替 $rootscope 
    ```
    $rootscope.key = value
    # 转换为
    globalservice.set(key,value);
    ```
* angular.extend 重写至 Util
* ng-click 修改为 (click)
* ng-class 修改为 [ngClass]
* ng-repeat 使用 ngFor 来替代，track by index 替换为*;$index = index* (个人思考),使用示例:
  ```html
  <!-- cities:数组。c:变量.index:索引 -->
  <div class="ui list" *ngFor="#c of cities;#num = index""> 
        <div class="item">{{num+3}}{{ c }}</div>
  </div>
  ```
* ng-show，消失了，建议用 *ngIf 或者 [hidden] 代替
* ng-src，消失了，建议用 src 代替,绑定使用 [src]
* ng-controller，消失了
* ng-include，消失了
