# 组件

## 用法
* [()]:双向绑定
* 动效示例:[@flyIn]="active"

## 组件通讯
* @input
* @output : new EventEmitter<String>():只负责发事件，父组件负责处理
* 通过service: subscribe
* 可以利用 route 进行通讯

## 生命周期的钩子
1. ngOnInit，在 constructor 初始化后进行，属性如 @input 开始有值

## Pipe
* implements PipeTransform,需要 import 和 export
* 不支持插入 html (会认为不安全)


## 好玩的插件
* TOIOT，立体显示网页结构

