# angular2高级特性
> 多看十万个为什么，可以理解更具体！

## Query
Query会解决开发者在 Angular 1 中面临的以下问题：
* pane总是有顺序的。
* 当发生变化的时候，QueryList会通知tab组件。
* Pane没有必要知道Tab的存在。这样Pane组件会更容易测试和复用。

## useClass
创建并返回一个指令类的新实例,使用该技术来为公共或默认类提供备选实现。该替代品能实现一个不同的策略，比如拓展默认类或者在测试的时候假冒真实类。

## 数据流
* ng2为单向数据流，速度快。
* 组件树:angular2-dependencies-graph


## NgModule
可以做懒加载,可以结合路由(path/loadchildren)使用，打包到一个js。

##  @types
参考1: http://www.cnblogs.com/haogj/p/6194472.html  
参考2:http://www.typescriptlang.org/docs/handbook/tsconfig-json.html  
基于 Typescript 开发的时候，很麻烦的一个问题就是类型定义。导致在编译的时候，经常会看到一连串的找不到类型的提示。
解决的方式经过了许多的变化，从 DefinitelyTyped 到 typings。最后是 @types。在 Typescript 2.0 之后，推荐使用 @types 方式。
### DefinitelyTyped
DefinitelyTyped 包含大量的高质量的 TypeScript 类型定义。



## 怎样使用外部库
### echarts

首先使用 npm 安装 echarts，接着可以封装成指令进行使用( 参考自 NiceFish )
```javascript
import * as echarts from 'echarts';

@Directive({
    selector: 'echart'
})
export class EChartOptionDirective1 implements OnInit {
    @Input('option') option: any;

    constructor(private el: ElementRef) {}

    public ngOnInit(): void {
        echarts.init(this.el.nativeElement).setOption(this.option);
    }
}
```
此外你也可以使用 echarts 开发成员网红羡辙提供的教程：  
http://zhangwenli.com/blog/2016/08/24/using-echarts-with-typescript/



### jquery
1. 在 index.html 中引入 jquery 文件
2. 在 ts 文件中声明: ```declare var $: any;```
3. 直接可使用

### 使用后续添加在 window 上的变量
```declare var 变量名: any;```


## 参考
* [【翻译】对比Angular1和Angular2中的依赖注入](https://my.oschina.net/mumu/blog/775695?utm_source=tuicool)
