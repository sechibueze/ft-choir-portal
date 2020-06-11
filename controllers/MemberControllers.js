const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Member = require('../models/Member');
const Profile = require('../models/Profile');
const memberAuthReducer = require('../helpers/memberAuthReducer');
const { getDataURI } = require('../helpers/dataURI')
const { cloudinaryUploader } = require('../config/cloudinaryConfig')
const getAllMembers = (req, res) => {
  Member.find({})
    .select('-password')
    
    .then(members => {
      return res.status(200).json({
        status: true,
        message: 'List of Members',
        data: members
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get members'
      });

    });
}

// Register/Signup new members
const registerMember = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  // ?Passed all validations 
  const {
    firstname,
    middlename,
    lastname,
    email,
    password
  } = req.body;

  Member.findOne({ email })
    .then(member => {
      
      if (member) {
        return res.status(401).json({
          error: 'Member already exists'
        });    
      }
      
      // No member exists
      let memberReq = {
        // Required fields
        firstname,
        lastname,
        email,
        password
      };
      
      if(middlename) memberReq.middlename = middlename;
      const newMember = new Member(memberReq);

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate salt' });

        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to hash password' });

          newMember.password = hash;
          newMember.save(err => {
            if (err) return res.status(500).json({ status: false, error: 'Invalid credentials! please confirm access token' });

            const payload = { memberId: newMember._id, auth: newMember.auth };
            jwt.sign(
              payload,
              process.env.JWT_SECRET_KEY,
              { expiresIn: 60 * 60 * 60 },
              (err, token) => {
                if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate token' });

                return res.status(201).json({
                  status: true,
                  message: 'User signup successful',
                  token
                });


              })
          })

        })
      })


    })
    .catch(err => {
     
        return res.status(500).json({
          status: false,
          error: 'Failed to create member'
        });   
    });
};

// Login existing users
const loginMember = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const { email, password } = req.body;
  Member.findOne({ email }, (err, member) => {
    if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve record' });

    if (!member) return res.status(403).json({ status: false, error: 'Account does not exist' });

    // User has account
    bcrypt.compare(password, member.password, (err, isMatch) => {
      if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to compare password' });

      if (!isMatch) return res.status(401).json({ status: false, error: 'Account does not exist' });

      const payload = { memberId: member._id, access: member.access, auth: member.auth };
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 * 60 },
        (err, token) => {
          if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to generate token' });

          return res.status(200).json({
            status: true,
            message: 'Member login successful',
            token
          });
        })
    })
  });
};
const getMemberByToken = (req, res) => {
  const currentMemberId = req.currentMember.memberId;
  Member.findOne({_id: currentMemberId })
    .select('-password')
    .then(member => {
      return res.status(200).json({
        status: true,
        message: 'Member Data',
        data: member
      
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get member'
      });

    });
}

const updateMemberData = (req, res) => {
  const memberId = req.currentMember.memberId;
  Member.findOne({ _id: memberId})
    .select('-password')
    .then(member => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: 'No member found'
        })
      }

      // Member found
      const { firstname, lastname, middlename, email} = req.body;
      if(firstname) member.firstname = firstname;
      if(lastname) member.lastname = lastname;
      if(middlename) member.middlename = middlename;
      if(email) member.email = email;
      member.save(err => {
        if (err) {
          return res.status(404).json({
          status: false,
          error: 'No member found'
        })
        }

        return res.status(200).json({
          status: true,
          message: 'Updated member data',
          data: member
        })

      })
    })
    .catch(err => {
      return res.status(500).json({
          status: false,
          error: 'Faied to update member'
        })
    })
};

const changePassword = (req, res) => {};
const updateMemberImage = (req, res) => {
  const memberId = req.currentMember.memberId;
  const dataURI = getDataURI(req);

  if (!dataURI) {
     return res.status(404).json({
          status: false,
          error: 'No data found'
        })
  }

  cloudinaryUploader.upload(dataURI, { public_id: memberId})
    .then(result => {
        const { secure_url } = result;
        
        Member.findOneAndUpdate({ _id: memberId}, { imageUrl: secure_url}, {upsert: true, new: true})
          .then(member => {
            return res.status(200).json({
                status: true,
                message: 'Updated member profile',
                data: member
              })
          }).catch(err=>{
             return res.status(500).json({
                  status: false,
                  error: 'Could not update data'
                })
          })
    })
    .catch(err => {
       return res.status(500).json({
          status: false,
          error: 'Could not upload data'
        })
    })

};

const manageMemberAuth = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  const { memberId, actionType } = req.body;

  Member.findOne({ _id: memberId })
    .select('-password')
    .then(member => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: 'No Such Memneber'
        });
      }
    //  Update Member Auth
    member.auth = memberAuthReducer(member.auth, actionType);
      member.save(err => {

        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update member auth'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Member  Auth Updated',
          data: member

        });
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get member'
      });

    });
}

const toggleMemberAdminAuth = (req, res) => {
 
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  const { email } = req.body;
  Member.findOne({ email })
    .select('-password')
    .then(member => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: 'No Such Memneber'
        });
      }

      if (!member.auth.includes('admin')) {
        member.auth = [...member.auth, 'admin'];
      } else {
        member.auth = member.auth.filter(auth => auth !== 'admin')
      }
      

      member.save(err => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update member auth'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Member Admin Auth Updated',
          data: member 
        });
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get member'
      });

    });
}

const toggleMemberAdminAuthByMemberId = (req, res) => {
 
  
  
  const { memberId } = req.params;
  Member.findOne({ _id: memberId })
    .select('-password')
    .then(member => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: 'No Such Memneber'
        });
      }

      if (!member.auth.includes('admin')) {
        member.auth = [...member.auth, 'admin'];
      } else {
        member.auth = member.auth.filter(auth => auth !== 'admin')
      }
      

      member.save(err => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update member auth'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Member Admin Auth Updated',
          data: member 
        });
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get member'
      });

    });
}

const deleteMemberById =  async (req, res) => {
  const { memberId } = req.params;
  try {
    await Member.findOneAndRemove({_id: memberId})
    await Profile.findOneAndRemove({member: memberId})
    
    return res.status(200).json({
      status: true,
      message: 'Deleted member',
      data: memberId
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: 'Failed to delete member'
    });
    
  }
};

const flushAll =  async (req, res) => {
 
  try {
    await Member.deleteMany({})
    await Profile.deleteMany({})
    
    return res.status(200).json({
      status: true,
      message: 'Data flushed'

    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: 'Failed to delete data'
    });
    
  }
};

module.exports = { getAllMembers, registerMember, loginMember, 
  toggleMemberAdminAuth,
  toggleMemberAdminAuthByMemberId,
  updateMemberData,
  changePassword,
  manageMemberAuth,
  getMemberByToken, 
  deleteMemberById,
  updateMemberImage,
  flushAll
 };