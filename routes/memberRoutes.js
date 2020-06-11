const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const checkAdmin = require('../middlewares/checkAdmin');
const { getAllMembers, registerMember, 
  toggleMemberAdminAuth, manageMemberAuth,
  loginMember, 
  updateMemberData,
  toggleMemberAdminAuthByMemberId,
  changePassword,
  getMemberByToken, 
  deleteMemberById,
  updateMemberImage,
  flushAll
} = require('../controllers/MemberControllers');
const { uploads } = require('../middlewares/uploadStorage')

  /**
 * @route POST /api/members
 * @desc Create a new member
 * @access private 
 */
// Append a middleware to validate access from AccessToken table before going forwars
router.post('/', [
  check('firstname', 'Firstname is required').notEmpty(),
  check('lastname', 'Lastname is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty()
], registerMember);

/**
 * @route GET /api/members
 * @desc get All members
 * @access private 
 */
router.get('/', getAllMembers);

/**
 * @route POST /api/members/login
 * @desc Login a  member
 * @access public 
 */
router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty()
], loginMember);

/**
 * @route GET /api/members/auth
 * @desc get current member by token
 * @access private 
 */
router.get('/auth', checkMember, getMemberByToken);

/**
 * @route PUT /api/members/
 * @desc get current member data except password
 * @access private 
 */
router.put('/', checkMember, updateMemberData);

/**
 * @route PUT /api/members/password
 * @desc Change password
 * @access private 
 */
router.put('/passwords',  changePassword);
/**
 * @route PUT /api/members/image
 * @desc Change image
 * @access private 
 */
router.put('/image', checkMember, uploads.single('image'), updateMemberImage);

/**
 * @route PUT /api/members/auth
 * @desc Manage Member Auth
 * @access private 
 */
router.put('/auth', 
[
  check('memberId', 'A member ID is required').notEmpty(),
  check('actionType', 'Action Type is required').notEmpty()
],
checkMember, checkAdmin, manageMemberAuth);

/**
 * @route[SECRET] PUT /api/members/admin
 * @desc Make Admin '' any  in member can do this
 * @access public 
 */
router.put('/admin', [ check('email', 'A member email is required').isEmail()],  toggleMemberAdminAuth);

/**
 * @route PUT /api/members/:memberId/admin
 * @desc Admin make member admin
 * @access private/admin
 */
router.put('/:memberId/admin', checkMember, checkAdmin,  toggleMemberAdminAuthByMemberId);

/**
 * @route DELETE /api/members/:memberId
 * @desc Delete Member By ID
 * @access private 
 */
router.delete('/:memberId', checkMember, checkAdmin, deleteMemberById);

/**
 * @route DELETE /api/members/flush
 * @desc Flush the database
 * @access private 
 */
router.delete('/all/flush', flushAll);


module.exports = router;