module.exports = {
  env:'development',
  debug:true,
  mongoConfig: {
    url: 'mongodb://localhost:27017/crawler-dev',
    opts:{
      user:'',
      pass:''
    }
  },
  'jwt': {
    'cert': 'crawler-dev'
  },
}
