const mongoose = require('mongoose');

const initDB = () => {
  const URI = process.env.MONGODBURI || 'mongodb://localhost:27017/ft-choir-portal';
  
  return mongoose.connect(URI,
    {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
module.exports = initDB;