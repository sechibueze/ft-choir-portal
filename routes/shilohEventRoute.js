const express = require('express');
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const checkAdmin = require('../middlewares/checkAdmin');
const router = express.Router();
const { 
  handleShilohEventRegistration,
  getAllShilohEventAttendees,
  getShilohAttendeeById,
  updateShilohAttendeeById,
  removeShilohAttendeeById,
  generateShilohAttendanceReport
 } = require('../controllers/ShilohEventControllers');

/**
 * @route GET /api/shiloh/register
 * @desc Register for shiloh
 * @access public
 */
router.post('/register', checkMember, handleShilohEventRegistration);

/**
 * @route GET /api/shiloh/attendees
 * @desc Get a list of all shiloh attendees
 * @access private && admin
 */
router.get('/attendees', checkMember, checkAdmin, getAllShilohEventAttendees);

/**
 * @route GET /api/shiloh/attendees/:accessId
 * @desc Get Attendee by ID
 * @access private && admin
 */
router.get('/attendees/:accessId', getShilohAttendeeById);

/**
 * @route PUT /api/shiloh/attendees/:accessId
 * @desc Remove Attendee
 * @access private && admin
 */

router.put('/attendees/:accessId', checkMember, updateShilohAttendeeById);
/**
 * @route PUT /api/shiloh/report
 * @desc Attendance report
 * @access private && admin
 */

router.get('/report', checkMember, checkAdmin, generateShilohAttendanceReport);
/**
 * @route PUT /api/shiloh/attendees/:accessId
 * @desc Remove Attendee
 * @access private && admin
 */

router.delete('/attendees/:accessId', checkMember, checkAdmin, removeShilohAttendeeById);

module.exports = router;