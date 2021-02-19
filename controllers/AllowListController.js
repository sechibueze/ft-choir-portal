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

const loadAllowList = (req, res) => {
    let exceltojson; //Initializatio
  //start convert process
            /** Check the extension of the incoming file and
             *  use the appropriate module
             */
            
            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }



            try {
                exceltojson({
                    input: req.file.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true
                }, function(err,result){
                    if(err) {
                        return res.status(500).json({
                                status: false,
                                error: 'Failed to parse excel file',
                                data: err
                            });
                    }
                    
                    // console.log('Results of converted file', result)
                    const hashedData = result.map(row => {
                        if (row.password) {
                            row.password = bcrypt.hashSync(row.password, 12);
                        } 
                        // mailingList.push(row.email);
                        return row
                    })
                    console.log('Results of hashed data', hashedData)
                    
                    Member
                    .insertMany(hashedData, { ordered: false})
                    .then(list => {
                        let mailingList = [];
                        let smsList = [];

                        list.map(row => {
                            mailingList.push(row.email);
                            smsList.push(row.phone);
                        })
                        console.log('Results of uploaded file', mailingList)
                        const msg = {
                            to: mailingList,
                            from: 'exco@ftc.com',
                            subject: 'New Account',
                            text: 'and easy to do anywhere, even with Node.js',
                            html: ONBBOARDING_MESSAGE
                          };
                            // filter email and phone from list and send email and
                        EmailService.send(msg)
                        .then(response => {
                            return res.status(201).json({
                            status: true,
                            message: `Users uploaded`,
                            data: response
                            });
                        })
                        .catch(err => {
                            console.log('Err ', err)
                            return res.status(500).json({
                            status: false,
                            errors: 'Failed to send email',
                            data: err
                            });
                        })

                        
                    })
                    .catch(e => {
                        console.log('bulkinsert err', e)
                        return res.status(500).json({
                            status: false,
                            error: 'Failed to uplaod list',
                            data: e
                        });
                    })
                    
                });
            } catch (e){
                return res.status(500).json({
                                status: false,
                                error: 'Failed to process file',
                                data: e
                            });
            }
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



module.exports = { loadAllowList, addAccess, getAllowList,  verify, deleteAccessById, purgeAllowList };