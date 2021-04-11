const express = require("express");
const { check } = require("express-validator");
const checkMember = require("../middlewares/checkMember");
const checkAdmin = require("../middlewares/checkAdmin");
const router = express.Router();
const {
  handleShilohEventRegistration,
  getAllShilohEventRegistrations,
  getShilohAttendeeById,
  updateShilohAttendeeById,
  removeShilohAttendeeById,
  generateShilohAttendanceReport,
} = require("../controllers/ShilohEventControllers");

/**
 * @route GET /api/shiloh/register
 * @desc Register for shiloh
 * @access public
 */
router.post("/register", checkMember, handleShilohEventRegistration);

/**
 * @route GET /api/shiloh/attendees
 * @desc Get a list of all shiloh attendees
 * @access private && admin
 */
router.get("/attendees", checkMember, getAllShilohEventRegistrations);

/**
 * @route GET /api/shiloh/attendees/:accessId
 * @desc Get Attendee by ID
 * @access private && admin
 */
router.get("/attendees/:accessId", getShilohAttendeeById);

/**
 * @route PUT /api/shiloh/attendees/:accessId
 * @desc Remove Attendee
 * @access private && admin
 */
router.put("/attendees/update", checkMember, updateShilohAttendeeById);

/**
 * @route PUT /api/shiloh/report
 * @desc Attendance report
 * @access private && admin
 */
router.get("/report", checkMember, checkAdmin, generateShilohAttendanceReport);

/**
 * @route PUT /api/shiloh/attendees/:accessId
 * @desc Remove Attendee
 * @access private && admin
 */
router.put("/attendees", checkMember, removeShilohAttendeeById);

module.exports = router;
