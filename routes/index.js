const express = require("express");

const router = express.Router();

/**** ROUTING  */
const memberRoutes = require("./memberRoutes");
const eventRoutes = require("./eventRoutes");
const profileRoutes = require("./profileRoutes");
const postRoutes = require("./postRoutes");
const shilohEventRoute = require("./shilohEventRoute");

router.use("/events", eventRoutes);
router.use("/members", memberRoutes);
router.use("/profiles", profileRoutes);
router.use("/posts", postRoutes);
router.use("/shiloh", shilohEventRoute);

// router.use('/access', accessTokenRoutes);
// router.use('/reports', reportRoutes);

module.exports = router;
