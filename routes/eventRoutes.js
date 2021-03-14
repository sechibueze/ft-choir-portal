const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const uploadFile = require("../config/multerConfig");
const {
  getEvents,
  createEvent,
  uploadAttendance,
  deleteEvents,
  updateEvent,
} = require("../controllers/EventControllers");

router.get("/", getEvents);

router.post("/", createEvent);

router.post("/attendance", uploadFile.single("attendance"), uploadAttendance);

router.put("/", updateEvent);

router.put("/delete", deleteEvents);

module.exports = router;
