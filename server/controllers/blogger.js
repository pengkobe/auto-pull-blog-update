"use strict"
const utils = require('../utils/index');
const Blogger = require('../models/blogger.js');
const mw = require('../middlewares/index.js');
module.exports.init = router => {
  router.post('/bloggers',mw.verify_token, create);
  router.patch('/bloggers/:id', mw.verify_token, modify)
  router.get('/bloggers',mw.verify_token,  bloggerList);
  router.get('/bloggers/:id', mw.verify_token, bloggerDetail)
  router.delete('/bloggers/:id',mw.verify_token, deleteBlogger)
}


async function create(ctx, next){
  const name = ctx.request.body.name,
    createTime = new Date(),
    taskjs = ctx.request.body.taskjs,
    url = ctx.request.body.url;
  if(name === ''){
    ctx.throw(400,'博主姓名不能为空！')
  }
  if(taskjs === ''){
    ctx.throw(400,'代码不能为空！')
  }

  let blogger = new Blogger({
    name,
    createTime,
    url,
    taskjs
  });
  blogger = await blogger.save().catch(err => {
    utils.logger.error(err);
    ctx.throw(500,'内部错误')
  });
  utils.print(blogger);
  ctx.status = 200;
  ctx.body = {
    success:true,
    data:blogger
  }
}


async function bloggerList(ctx, next){
  const tag = ctx.query.tag,
    queryOpt = {};
  if(tag !== undefined){
    queryOpt.url= {"$all":[tag]}
  }
  utils.print(queryOpt);
  const bloggerArr = await Blogger.find(queryOpt)
    .select('name createTime url ')
    .sort({ createTime: -1})
    .exec().catch(err => {
    utils.logger.error(err);
    ctx.throw(500,'内部错误')
  })
  const resultArr = [];
  if(bloggerArr.length){
    bloggerArr.forEach((blogger,index,arr)=>{
      blogger = blogger.toObject();
      resultArr.push(blogger);
      utils.print(blogger);
    })
  }
  ctx.status = 200;
  ctx.body = {
    success:true,
    data:resultArr
  };
}


async function modify(ctx, next){
  const id = ctx.params.id;
  const modifyOption = ctx.request.body;
  modifyOption.lastEditTime = new Date();
  modifyOption.bloggerPublished = false;
  let result = await Blogger.findByIdAndUpdate(id,{$set:modifyOption},{new:true}).populate('url').exec()
    .catch(err => {
      if(err.name === 'CastError'){
        ctx.throw(400,'id不存在');
      }else{
        utils.logger.error(err);
        ctx.throw(500,'内部错误')
      }
    });
  result = result.toObject();
  utils.print(result);
  ctx.status = 200;
  ctx.body = {
    success:true,
    data:result
  }
}

/**
 * delete
 */
async function deleteBlogger(ctx, next){
  const id = ctx.params.id;
  const blogger = await Blogger.findOne({_id:id})
    .select('name')
    .exec().catch(err => {
      utils.logger.error(err);
      ctx.throw(500,'内部错误')
    })
  if(null === blogger){
    ctx.throw(400,'id不存在');
  }

  const result = await Blogger.remove({_id:id}).exec().catch(err => {
    utils.logger.error(err);
    ctx.throw(500,'内部错误')
  });
  ctx.status = 200;
  ctx.body = {
    success:true,
  }
}
