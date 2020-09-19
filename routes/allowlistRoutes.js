const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { loadAllowList, addAccess, getAllowList, verify, deleteAccessById ,purgeAllowList } = require('../controllers/AllowListController');



const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    console.log('fille mimetype', req.file)
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if ( file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")){
      cb(null, 'uploads')
    }else{
      cb('Please upload an excel file', false);
    }
  },
  filename: function(req, file, cb){
    console.log('file', file)
   let fname =  file.originalname.split('.')[file.originalname.split('.').length-1] === 'xlsx' ? 'allowlist.xlsx' : 'allowlist.xls';
    cb(null, fname)
  }

});

const upload = multer({ 
      storage: storage, 
      fileFilter:  function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    } 
    });


router.post('/', upload.single('allowlist'), loadAllowList);

router.post('/verify', verify);

router.put('/', addAccess);

router.get('/',  getAllowList);

router.delete('/',  purgeAllowList);

router.delete('/:accessId', deleteAccessById );




module.exports = router;