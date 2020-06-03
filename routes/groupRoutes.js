const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { getAllGroups, createGroup, updateGroupById, getAllGroupMembers} = require('../controllers/GroupControllers');

/**
 * @route GET /api/groups
 * @desc Get a list of all groups
 * @access private && admin
 */
router.get('/', getAllGroups);
/**
 * @route GET /api/groups/:groupId/members
 * @desc Get a list of all group members
 * @access private && admin
 */
router.get('/:groupId/members', getAllGroupMembers);

/**
 * @route POST /api/groups
 * @desc Create a new group
 * @access private && admin
 */
router.post('/',[ check('name', 'Group name is required').notEmpty()], createGroup);

/**
 * @route PUT /api/groups/:groupId
 * @desc Update group
 * @access private && admin
 */
router.put('/:groupId',[check('name', 'Group name is required').notEmpty()], updateGroupById);

module.exports = router;