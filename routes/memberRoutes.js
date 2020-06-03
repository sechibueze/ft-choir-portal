const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkMember = require('../middlewares/checkMember');
const checkAdmin = require('../middlewares/checkAdmin');
const { getAllMembers, registerMember, 
  toggleMemberAdminAuth, manageMemberAuth,
  loginMember, getMemberByToken, deleteMemberById} = require('../controllers/MemberControllers');

/**
 * @route GET /api/members
 * @desc get All members
 * @access private 
 */
router.get('/', getAllMembers);

/**
 * @route POST /api/members
 * @desc Create a new member
 * @access private 
 */
// Append a middleware to validate access from AccessToken table before going forwars
router.post('/', [
  // check('group', 'Group name is required').notEmpty(),
  check('access', 'Access token is required').notEmpty(),
  check('firstname', 'Firstname is required').notEmpty(),
  check('lastname', 'Lastname is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty()
], registerMember);


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
 * @route[SECRET] PUT /api/members/:memberId/admin
 * @desc Make Admin '' any  in member can do this
 * @access private 
 */
router.get('/:memberId/admin',  toggleMemberAdminAuth);


/**
 * @route DELETE /api/members/:memberId
 * @desc Delete Member By ID
 * @access private 
 */
router.delete('/:memberId', deleteMemberById);
module.exports = router;