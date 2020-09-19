const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const AllowList = require('../models/AllowList');

let exceltojson; //Initializatio

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

                    AllowList
                        .insertMany(result)
                        .then(list => {
                            return res.status(201).json({
                                status: true,
                                message: 'Allow list uploaded',
                                data: list
                            });
                        })
                        .catch(e => {
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