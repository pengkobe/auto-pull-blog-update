# KOA2

### KOA1 vs KOA2
koa1/generator/yield
ko2/await/async

### Using now
1. nodemon + runkoa (support async/await，don't need to worry about babel)
2. middlewares
   - koa-router
   - koa-bodyparser
   - [koa-onerror](https://github.com/koajs/onerror)
   - koa-logger
   - [mini-logger](https://github.com/node-modules/mini-logger)
   - validator
   - mongoose

### Problems
不知道以下两种方式有何差异，方式2会导致请求404是怎么回事?(但是请求根目录并不会)
```javascript
// 方式1
index.init(router);
// 方式2
router.use('/', index.routes(), index.allowedMethods());
```

### Jade/Plug
http://naltatis.github.io/jade-syntax-docs/

### 如何优雅的处理错误
http://taobaofed.org/blog/2016/03/18/error-handling-in-koa/

### DOC
https://github.com/koajs/koa/blob/v2.x/Readme.md

### koa-logger
