const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const AllowList = require('../models/AllowList');
const Member = require('../models/Member');
const EmailService = require('../helpers/sendEmail')
const bcrypt = require('bcryptjs');
const { ONBBOARDING_MESSAGE } = require('../config/constants');


const getAllowList = (req, res) => {
  AllowList
    .find({})
    .then(list => {
        return res.status(200).json({
            status: true,
            message: 'Allowed list',
            data: list
        });
    })
    .catch(e => {
        return res.status(500).json({
                status: false,
                error: 'Failed to retrieve allow list',
                data: e
            });
    })
};

const verify = (req, res) => {
//   return console.log('Loading allow list....', req.files);

  const { accessId } = req.body;

  AllowList
    .findOne({ id: accessId })
    .then(memberAccess => {
        if (!memberAccess) {
            return res.status(401).json({
                status: false,
                error: 'Data not found'
            })
        }
        const blacklist = ['inactive', 'suspended']
        if ( blacklist.includes(memberAccess.status.toLowerCase().trim())) {
            return res.status(401).json({
                status: false,
                error: `${ memberAccess.status } members are not authorized to register`
            })
        }

        return res.status(200).json({
            status: true,
            message: 'proceed to registration',
            data: memberAccess
        })


    })
    .catch(e => {
        return res.status(500).json({
            status: false,
            error: 'Server error: '
        })
    })
};


const addAccess = (req, res) => {
  
  const { id, status } = req.body;

  let newAccess = new AllowList({ id, status });

  newAccess.save(err => {
      if (err) {
          return res.status(500).json({
                                status: false,
                                error: 'Failed to add access',
                                data: err
                            });
      }

      return res.status(200).json({
            status: true,
            message: 'Access added',
            data: newAccess
        }); 
  })
                   
                     
             
           
};

const purgeAllowList = (req, res) => {
  AllowList
    .deleteMany({})
    .then(list => {
        return res.status(200).json({
            status: true,
            message: 'Allowed list deleted',
            data: list
        });
    })
    .catch(e => {
        return res.status(500).json({
                status: false,
                error: 'Failed to purge allow list',
                data: e
            });
    })
};

const deleteAccessById = (req, res) => {
    const { accessId } = req.params;
  AllowList
    .deleteOne({_id: accessId })
    .then(list => {
        return res.status(200).json({
            status: true,
            message: 'Access deleted',
            data: list
        });
    })
    .catch(e => {
        return res.status(500).json({
                status: false,
                error: 'Failed to delete access',
                data: e
            });
    })
};



module.exports = { addAccess, getAllowList,  verify, deleteAccessById, purgeAllowList };