# 表单
使用场景太多，以至于需要单独来讲

## 定义
#form=“ngForm”:可以直接在 ts 代码中引用。
* []:值绑定
* [()]:双向绑定

## 模板驱动型表单
user-login
纯html型

## 响应式表单
user-register
FormBuilder
使用class

## 动态表单
user-profile
通过 js 创建

## 内置校验规则
。。。


## 自定义校验规则
implements Validator

```javascript
import { Directive,Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[validateEqual]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true }
    ]
})
export class EqualValidator implements Validator {
    @Input()validateEqual: string;
    @Input()reverse: boolean;
    constructor() { }

    validate(control: AbstractControl): { [key: string]: any } {
        //当前控件的值
        let selfValue = control.value;

        // 需要比较的控件，根据属性名称获取
        let targetControl = control.root.get(this.validateEqual);
        // 值不相等
        if (targetControl && selfValue !== targetControl.value ) {
            if(!this.reverse){
                return {
                    validateEqual: false
                }
            }else{
                targetControl.setErrors({
                    validateEqual: false
                })
            }
        }else{//值相等，清空错误信息
           targetControl.setErrors(null);
        }
        return null;
    }
}

````


## 参考
http://v.youku.com/v_show/id_XMjUzMTM1ODU2OA==.html
