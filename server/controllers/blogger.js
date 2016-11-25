"use strict"
const utils = require('../utils/index');
const Blogger = require('../models/blogger.js');
module.exports.init = router => {
  router.post('/bloggers',  create);
  router.patch('/bloggers/:id',  modify)
  router.get('/bloggers',  bloggerList);
  router.get('/bloggers/:id',  bloggerDetail)
  router.delete('/bloggers/:id', deleteBlogger)
}


async function create(ctx, next){
  const name = ctx.request.body.name,
    createTime = new Date(),
    url = ctx.request.body.url;
  if(name === ''){
    ctx.throw(400,'博主姓名不能为空！')
  }
  let blogger = new Blogger({
    name,
    createTime,
    url
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


async function bloggerList(){
  const tag = this.query.tag,
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
    this.throw(500,'内部错误')
  })
  const resultArr = [];
  if(bloggerArr.length){
    bloggerArr.forEach((blogger,index,arr)=>{
      blogger = blogger.toObject();
      resultArr.push(blogger);
      utils.print(blogger);
    })
  }
  this.status = 200;
  this.body = {
    success:true,
    data:resultArr
  };
}


async function modify(){
  const id = this.params.id;
  const modifyOption = ctx.request.body;
  modifyOption.lastEditTime = new Date();
  modifyOption.bloggerPublished = false;
  let result = await Blogger.findByIdAndUpdate(id,{$set:modifyOption},{new:true}).populate('url').exec()
    .catch(err => {
      if(err.name === 'CastError'){
        this.throw(400,'id不存在');
      }else{
        utils.logger.error(err);
        this.throw(500,'内部错误')
      }
    });
  result = result.toObject();
  utils.print(result);
  this.status = 200;
  this.body = {
    success:true,
    data:result
  }
}

/**
 * delete
 */
async function deleteBlogger(){
  const id = this.params.id;
  const blogger = await Blogger.findOne({_id:id})
    .select('name')
    .exec().catch(err => {
      utils.logger.error(err);
      this.throw(500,'内部错误')
    })
  if(null === blogger){
    this.throw(400,'id不存在');
  }
  
  const result = await Blogger.remove({_id:id}).exec().catch(err => {
    utils.logger.error(err);
    this.throw(500,'内部错误')
  });
  this.status = 200;
  this.body = {
    success:true,
  }
}
