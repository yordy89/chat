module.exports = {
  port: process.env.PORT || 5000,
  db:{
      url:process.env.MONGODB || 'mongodb://localhost:27017/chat',
      options:{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      }
  }
}