const express = require('express');
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const checkAdmin = require('../middlewares/checkAdmin');
const router = express.Router();
const {
generateReportForProfiles
} = require('../controllers/reportControllers')

/**
 * @route GET /api/reports/profiles
 * @desc Generate a report for all profile data
 * @access private
 */
router.get('/profiles', checkMember, checkAdmin,  generateReportForProfiles);

module.exports = router;