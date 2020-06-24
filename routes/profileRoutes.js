const express = require('express');
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const checkAdmin = require('../middlewares/checkAdmin');
const router = express.Router();
const { getAllProfiles, getProfileById,
   createProfile, 
   getCurrentMemberProfile,
   getProfileByMemeberId,
  updateNOKInfo,
  updateUnitInfo,
  updateChurchInfo,
   deleteProfile } = require('../controllers/ProfileControllers');

/**
 * @route GET /api/profiles?
 * @desc get profiles by filter
 * @access private
 */
router.get('/', getAllProfiles);

/**
 * @route GET /api/profiles/me
 * @desc GEt  Current members Profile By ID
 * @access public
 */
router.get('/me', checkMember,  getCurrentMemberProfile);


/**
 * @route GET /api/profiles/:profileId/members
 * @desc GEt Profile By ID
 * @access public
 */
router.get('/:profileId/profile',  getProfileById);

/**
 * @route GET /api/profiles/members/:memberId/
 * @desc GEt Profile By ID
 * @access public
 */
router.get('/members/:memberId',  getProfileByMemeberId);

/**
 * @route POST /api/profiles
 * @desc Create/Update a profiles
 * @access private
 */
router.post('/', checkMember, createProfile);

/**
 * @route PUT /api/profiles/nok
 * @desc Update NOK Info
 * @access private
 */
router.put('/nok', checkMember, updateNOKInfo);

/**
 * @route PUT /api/profiles/unitinfo
 * @desc Update Unit Info Info
 * @access private
 */
router.put('/unitinfo', checkMember, updateUnitInfo);
/**
 * @route PUT /api/profiles/churchinfo
 * @desc Update Church Info Info
 * @access private
 */
router.put('/churchinfo', checkMember, updateChurchInfo);

/**
 * @route DELETE /api/profiles/:memberId
 * @desc Delete user profile
 * @access private ..member
 */
router.delete('/:memberId', checkMember, checkAdmin,  deleteProfile);

module.exports = router;