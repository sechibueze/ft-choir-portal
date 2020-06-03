const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { getAccessTokens, createAccessToken, confirmAccessTokens, 
  updateAccessTokenById, toggleTokenValidity, deleteAccessToken } = require('../controllers/AccessTokenControllers');

/**
 * @route GET /api/access
 * @desc Get All tokens 
 * @access private && Admin
 */
// /api/access?isValid=true
router.get('/', getAccessTokens);

/**
 * @route POST /api/access
 * @desc Create a token 
 * @access private && Admin
 */

router.post('/', [check('group', 'Group name is required').notEmpty()], createAccessToken);

/**
 * @route PUT /api/access/:accessTokenId/validity
 * @desc Toggle access  token isvalid
 * @access private && Admin
 */

router.put('/:accessTokenId/validity', toggleTokenValidity);

/**
 * @route PUT /api/access/:accessTokenId
 * @desc Update Token > change group
 * @access private && Admin
 */

router.put('/:accessTokenId', [check('group', 'Group name is required').notEmpty()], updateAccessTokenById);

/**
 * @route POST /api/access/confirmation
 * @desc Confirm token before signup
 * @access public
 */

router.post('/confirmation', [check('token', 'Token is required').notEmpty()], confirmAccessTokens);

/**
 * @route DELETE /api/access/
 * @desc Delete token
 * @access private $$ Admin
 */

router.delete('/', [check('access', 'Token is required').notEmpty()], deleteAccessToken);

module.exports = router;