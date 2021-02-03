require('dotenv').config();
module.exports = {
  MONGOURI: process.env.MONGOURI || 'mongodb://localhost:27017/nodekb',
  mongoOption: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  PORT: process.env.PORT || 3000
};
