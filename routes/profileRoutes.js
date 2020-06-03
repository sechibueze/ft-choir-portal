const express = require('express');
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const router = express.Router();
const { getProfilesByFilter, createProfile, deleteProfile } = require('../controllers/ProfileControllers');

/**
 * @route GET /api/profiles?
 * @desc get profiles by filter
 * @access private
 */
router.get('/', getProfilesByFilter);


/**
 * @route POStT /api/profiles?
 * @desc Create/Update a profiles
 * @access private
 */
// [
//   check('member', 'A member is required').notEmpty(),
// ],
router.post('/', checkMember, createProfile);

/**
 * @route DELETE /api/profiles
 * @desc Delete my profile
 * @access private ..member
 */
router.delete('/', checkMember,  deleteProfile);

module.exports = router;