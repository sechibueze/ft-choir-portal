const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Member = require('../models/Member');
const memberAuthReducer = require('../helpers/memberAuthReducer')
const getAllMembers = (req, res) => {

  Member.find({})
    .populate({
      path: 'group',
      select: ['name'],
      model: Group
    })
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
    access, //6 characters => note entered directly by user
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
      

      let memberReq = {
        access,
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
            if (err) return res.status(500).json({ status: false, error: 'Server error:: Failed to save user' });

            const payload = { memberId: newMember._id, access: newMember.access, auth: newMember.auth };
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
  const memberId = req.params.memberId;
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
const deleteMemberById = (req, res) => {

  
  const { memberId } = req.params;
  
  Member.findOneAndRemove({ _id: memberId }, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        error: 'Failed to delete member'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Deleted member',
      data: memberId
    });

  });
};

module.exports = { getAllMembers, registerMember, loginMember, 
  toggleMemberAdminAuth,
  manageMemberAuth,
  getMemberByToken, deleteMemberById };