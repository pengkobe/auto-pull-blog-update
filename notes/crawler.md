# Web Crawler 实践

### node 插件
1. superagent
2. cheerio
3. node-schedule
4. eventproxy( todo )

### 功能点
1. 首页，展示博主最新博文
   - 按照已读、未读进行筛选
   - 删除
2. 录入博主
   - Url
   - 详细说明
3. 任务面板
   - 在线修改
   - 上线代码


## 文件结构
```
├─app
│--- xx.module.ts           // 入口模块定义
│--- xx.routes.ts           // 路由
│  ├─ sub-module            // 子模块目录
│  │  ├─ components/            // 组件
│  │  │  ├─ com1/
│  │  │  │  ├─ com.service.ts
│  │  │  │  ├─ ...
│  │  ├─ model/                 // 子模块Model
│  │  ├─ services/              // 子模块服务
│  │  ├─ sub.module.ts          // 子模块入口
│  │  ├─ sub.routes.ts          // 子模块路由
│  │  └─...
```

## 路由
* 懒加载模块+子路由构建，不需要一次性全部定义完成。
* 解决了权限控制的烦心事?

### 更多
可以直接使用node爬虫插件:Crawler：https://github.com/bda-research/node-crawler

### 参考
基于koa2的一个实践: https://segmentfault.com/a/1190000005742172
github上一些参考资料:
https://github.com/i5ting/simplereader

