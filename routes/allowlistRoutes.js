const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { loadAllowList, addAccess, getAllowList, verify, deleteAccessById ,purgeAllowList } = require('../controllers/AllowListController');







router.post('/verify', verify);

router.put('/', addAccess);

router.get('/',  getAllowList);

router.delete('/',  purgeAllowList);

router.delete('/:accessId', deleteAccessById );




module.exports = router;