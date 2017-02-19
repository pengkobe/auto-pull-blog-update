const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const jwt = require("jsonwebtoken");
var cors = require('koa-cors');

const index = require('./routes/index');
const controllers = require('./controllers/index.js');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'jade'
}));

const config = require('./config/index'),
    mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts);

/**
 * 将config注入中间件的ctx
 * */
app.context.config = config;

/**
 * 鉴权
 */
jwt.co_verify = function(jwtString, secretOrPublicKey, options) {
        return function(cb) {
            jwt.verify(jwtString, secretOrPublicKey, options, cb);
        }
    }
    // 允许跨域访问
app.use(cors());
// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

index.init(router);
controllers.init(router);
app.use(router.routes(), router.allowedMethods());

//router.use('/', index.routes(), index.allowedMethods());
// 处理各类异常并返回
onerror(app
  ,{
  all:function(err){
    this.type = 'json';
    this.body={
      success:false,
      message:err
    };
    // 必须转换为 JSON 格式
    this.body = JSON.stringify(this.bo);
  }
}
);
app.on('error', function(err, ctx) {
    console.log('server error:', ctx);
    //logger.error('server error', err, ctx);
});

module.exports = app;
