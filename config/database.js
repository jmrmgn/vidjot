if (process.env.NODE_ENV === 'production') {
   module.exports = {
      MONGO_URI: 'mongodb://admin:test1234@ds123124.mlab.com:23124/db-vidjot'
   }
}
else {
   module.exports = {
      MONGO_URI: 'mongodb://localhost/vidjot-dev'
   }
}