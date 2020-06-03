const express = require('express');
const { config } = require('dotenv');
const initDB = require('./config/initDB');

const app = express();
initDB();
config(); // Load .env Variables

const port = process.env.PORT || 5000;
app.use(express.json({extended: true}));

/**** ROUTING  */
const groupRoutes = require('./routes/groupRoutes');
const memberRoutes = require('./routes/memberRoutes');
const profileRoutes = require('./routes/profileRoutes');
const accessTokenRoutes = require('./routes/accessTokenRoutes');

app.use('/api/groups', groupRoutes);
app.use('/api/access', accessTokenRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/profiles', profileRoutes);

app.use((req, res) => {
  return res.status(200).json({
    status: true,
    message: 'ft choir portal running'
  });
});

app.listen(port, () => console.log(`FT_CHOIR_PORTAL::running on ${port}`));
