const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');

const app = express();
config(); // Load .env Variables
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/ft-choir-portal" ;

app.use(express.json({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", 'x-auth-token, Content-Type, Access-Control-Allow-Headers');
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE, PUT');
  next();
});

const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

app.use('/', (req, res) => {
  res.json({
    OK: 1
  })
})

// server.applyMiddleware({ app });
mongoose.connect(MONGODB_URI, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully to connected to DB')
  app.listen({port}, () => console.log(`FT_CHOIR_PORTAL::running on http://localhost:${port}`));
}).catch(err => {
  console.log('Failed to connect to DB', err)
});
