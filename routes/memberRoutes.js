const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const checkAdmin = require('../middlewares/checkAdmin');
const { 
  membersRegistrationByUpload,
  getAllMembers, 
  registerMember, 
  toggleMembersAdminAuth,
   manageMemberAuth,
  loginMember, 
  updateMemberData,
  toggleMemberAdminAuthByMemberId,
  forgotPassword, resetPassword,
  getMemberByToken, 
  deleteMembersByIds,
  updateMemberImage,
  deleteMembers
} = require('../controllers/MemberControllers');

const { uploads } = require('../middlewares/uploadStorage')
const uploadFile = require('../config/multerConfig')

/**
 * @route POST /api/members/uploads
 * @desc Create new members by uploads
 * @access private 
 */
router.post('/uploads', uploadFile.single('members_upload'), checkMember, membersRegistrationByUpload);

  /**
 * @route POST /api/members
 * @desc Create a new member
 * @access private 
 */
// Append a middleware to validate access from AccessToken table before going forwars
router.post('/', [
  check('access', 'Access ID is required').notEmpty(),
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
router.get('/', checkMember, getAllMembers);



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
 * @desc update current member data except password
 * @access private 
 */
router.put('/', checkMember, updateMemberData);

/**
 * @route PUT /api/members/forgotpassword
 * @desc send password reset token
 * @access public 
 */
router.put('/forgotpassword', [
   check('email', 'Email is required').isEmail()
], forgotPassword);

/**
 * @route PUT /api/members/forgotpassword
 * @desc Change password
 * @access public 
 */
router.put('/resetpassword', [
   check('password', 'Password is required').notEmpty(),
   check('passwordResetToken', 'No Token found').notEmpty()
], resetPassword);



/**
 * @route[SECRET] PUT /api/members/admin
 * @desc Make Admin '' any  in member can do this
 * @access public 
 */
router.put('/admin', checkMember, toggleMembersAdminAuth);

/**
 * @route PUT /api/members/image
 * @desc Change image
 * @access private 
 */
router.put('/image', checkMember, uploads.single('image'), updateMemberImage);

/**
 * @route DELETE /api/members/delete
 * @desc Delete Member By IDs
 * @access private 
 */
router.put('/delete', checkMember, deleteMembersByIds);
// ----------------------------------------------------------------------------
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
 * @route PUT /api/members/:memberId/admin
 * @desc Admin make member admin
 * @access private/admin
 */
router.put('/:memberId/admin', checkMember,  toggleMemberAdminAuthByMemberId);



/**
 * @route DELETE /api/members
 * @desc Flush the database
 * @access private 
 */
router.delete('/', deleteMembers);


module.exports = router;