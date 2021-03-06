const express = require('express');

const router = express.Router();


/**** ROUTING  */
const memberRoutes = require('./memberRoutes');
// const groupRoutes = require('./groupRoutes');
const profileRoutes = require('./profileRoutes');
// const postRoutes = require('./postRoutes');
// const reportRoutes = require('./reportRoutes');
// const accessTokenRoutes = require('./accessTokenRoutes');
// // const allowlistRoutes = require('./allowlistRoutes');
// const shilohEventRoute = require('./shilohEventRoute');

// router.use('/allowlist', allowlistRoutes);
// router.use('/groups', groupRoutes);
// router.use('/access', accessTokenRoutes);
router.use('/members', memberRoutes);
router.use('/profiles', profileRoutes);
// router.use('/posts', postRoutes);
// router.use('/reports', reportRoutes);
// router.use('/shiloh', shilohEventRoute);

module.exports = router;