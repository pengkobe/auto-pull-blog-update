module.exports = {
  mongoConfig: {
    url: 'mongodb://localhost:27017/crawler-production',
    opts:{
      user:'',
      pass:''
    }
  },
  'jwt': { // json web token
    'cert': 'crawler-product'
  },
}
