# web组件化
> 可以创建自己的标签，想想都兴奋，不过更兴奋的构建复杂应用的成本将会更低

### 创建自定义标签
registerElement用于创建自定义的HTML元素
```javascript
    var YiPengElement = document.registerElement('yi-peng');
    document.body.appendChild(new YiPengElement());
```

接下来就可以在*body*中添加标签了，注意*-*字符必不可少

```html
<yi-peng></yi-peng>
```

### 提供JS接口
```javascript
// step  1
var XTreehouseProto = Object.create(HTMLElement.prototype);
// step 2
XTreehouseProto.hello = function() {
    alert('Hello!');
}
// step 3
Object.defineProperty(XTreehouseProto, 'badges', {
    value: 20,
    writable : true
});
// step 4
var XTreehouseElement = document.registerElement('x-treehouse',  {
    prototype: XTreehouseProto
});
// step 5
var xtreehouse = new XTreehouseElement();
document.body.appendChild(xtreehouse);

// step 6
xtreehouse.hello();
var badges = xtreehouse.badges;
```

### 继承现有元素
```javascript
// step 1
var ThumbImageProto = Object.create(HTMLImageElement.prototype);
// step 2
ThumbImageProto.createdCallback = function() {
    this.width = '100';
    this.height = '100';
};
// step 3
ThumbImageProto.changeImage = function() {
    this.src = 'new-image.jpg';
};
// step 4
var ThumbImage = document.registerElement('thumb-img', {
    prototype: ThumbImageProto,
    extends: 'img'
});
// step 5
/** is表示继承
* HTML: <img is="thumb-img">
*/
```

### 自定义回调
```javascript
var XTreehouseProto = Object.create(HTMLElement.prototype);

XTreehouseProto.createdCallback = function() {}
XTreehouseProto.attachedCallback = function() {}
XTreehouseProto.detachedCallback = function() {}
XTreehouseProto.attributeChangedCallback = function(attrName, oldValue, newValue) {}

var XTreehouse = document.registerElement('x-treehouse',
{ prototype: XTreehouseProto });
```

### 结合Shadow DOM使用
```javascript
var XProductProto = Object.create(HTMLElement.prototype);

XProductProto.createdCallback = function() {
    // 创建Shadow Root
    var shadow = this.createShadowRoot();

    // 创建商品图片
    var img = document.createElement('img');
    img.alt = this.getAttribute('data-name');
    img.src = this.getAttribute('data-img');
    img.width = '150';
    img.height = '150';
    img.className = 'product-img';

    shadow.appendChild(img);

    // 添加事件
    img.addEventListener('click', function(e) {
        window.location = this.getAttribute('data-url');
    });

    // 创建商品链接
    var link = document.createElement('a');
    link.innerText = this.getAttribute('data-name');
    link.href = this.getAttribute('data-url');
    link.className = 'product-name';

    shadow.appendChild(link);
};


// 注册元素
var XProduct = document.registerElement('x-product', {
    prototype: XProductProto
});
```
当然，你需要加点css来使得其更加好看

```css
x-product {
    display: inline-block;
    float: left;
    margin: 0.5em;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    font-family: Helvetica, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
}
/*注意这里 ::shadow*/
x-product::shadow .product-img {
    cursor: pointer;
    background: #FFF;
    margin: 0.5em;
}

x-product::shadow .product-name {
    display: block;
    text-align: center;
    text-decoration: none;
    color: #08C;
    border-top: 1px solid #EEE;
    font-weight: bold;

```

### 后话
开始是想着使用web-conponents手写这个项目，但是自己又没有设计细胞，想着去找相关的框架，结果搜遍github只
找到一个叫做[brick](https://github.com/mozbrick/brick)的框架，在两年前就停止维护了，难道用jquery写么！
天啊，这工作量有点大啊。又想着react\vue\angular1.x都有使用在玩的项目，于是决定拿angular2.x试试，祝我好运吧！

### 参考
http://blog.teamtreehouse.com/create-custom-html-elements-2
