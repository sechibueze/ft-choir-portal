const express = require('express');
const path = require('path');
const { config } = require('dotenv');
const initDB = require('./config/initDB');
config(); // Load .env Variables

const app = express();
initDB();
const port = process.env.PORT || 5000;
app.use(express.json({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", 'x-auth-token, Content-Type, Access-Control-Allow-Headers');
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE, PUT');
  next();
});
/**** ROUTING  */
const groupRoutes = require('./routes/groupRoutes');
const memberRoutes = require('./routes/memberRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const reportRoutes = require('./routes/reportRoutes');
const accessTokenRoutes = require('./routes/accessTokenRoutes');
const allowlistRoutes = require('./routes/allowlistRoutes');
const shilohEventRoute = require('./routes/shilohEventRoute');

app.use('/api/allowlist', allowlistRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/access', accessTokenRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/shiloh', shilohEventRoute);


if (process.env.NODE_ENV === 'production') {
    // set static folder 
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}
app.listen(port, () => console.log(`FT_CHOIR_PORTAL::running on ${port}`));
