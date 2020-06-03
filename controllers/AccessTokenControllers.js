const AccessTokenGenerator = require('otp-generator');
const { validationResult } = require('express-validator');
const AccessToken = require('../models/AccessToken');
const Member = require('../models/Member');

const getAccessTokens = (req, res) => {
  const { isValid } = req.query;
  let filter = {};
  if(isValid) filter.isValid = isValid;
  AccessToken.find(filter)
  .populate({
    path: 'group',
    select: ['name'],
    model: Group
  })
    .then(accessTokens => {

      return res.status(200).json({
        status: true,
        message: 'List of Access Tokens',
        data: accessTokens
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get accessTokens'
      });

    });
};

const confirmAccessTokens = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  };
  const { token } = req.body;

  AccessToken.findOne({ token })
  .populate({
    path: 'group',
    select: ['name'],
    model: Group
  })
    .then(accessToken => {

      return res.status(200).json({
        status: true,
        message: 'Your Token',
        data: accessToken
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get accessTokens'
      });

    });
}

// Create a new AccessToken
const createAccessToken = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const { group } = req.body;
  // Get Token
  const token = AccessTokenGenerator.generate(6, { upperCase: true, digits: true, specialChars: false });

  let accessTokenBody = { group , token };
  
  const newAccessToken = new AccessToken(accessTokenBody);

  newAccessToken.save(err => {
    if (err) {
      return res.status(500).json({
        status: false,
        error: 'Failed to create access token'
      });
    }

    return res.status(201).json({
      status: true,
      message: 'Access Token created',
      data: newAccessToken
    });
  });
};

// Admin cannot delete a token but can toggle its validity
// if the token is not associated with any member
// This can be a way of issuing probation to erring members for a sesson
const toggleTokenValidity = (req, res) => {
  const { accessTokenId } = req.params;

  AccessToken.findOne( { _id: accessTokenId })
    
    .then(accessToken => {
      if (!accessToken) {
        return res.status(404).json({
          status: false,
          error: 'Access Not found'
        });
      }
      // ?found access toggle
      accessToken.isValid = !accessToken.isValid;
      accessToken.save(err => {

        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Updated Token',
          data: accessToken
        });
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get accessTokens'
      });

    });
}

const updateAccessTokenById = (req, res) => {
  const { accessTokenId } = req.params;
  const { group } = req.body;
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  if (!accessTokenId) {
    return res.status(400).json({
      status: false,
      error: 'Access ID is required '
    });
  }
  AccessToken.findOne( { _id: accessTokenId })
    
    .then(accessToken => {
      if (!accessToken) {
        return res.status(404).json({
          status: false,
          error: 'Access Not found'
        });
      }
      // ?found access UPDATE it
      
      if (group) accessToken.group = group;
      accessToken.save(err => {

        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Updated Token',
          data: accessToken
        });
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get accessTokens'
      });

    });
};
// Before Admin can delete
// Confirm that no Member is using it
// else first delete member before token
const deleteAccessToken = (req, res) => {
  
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  const { access } = req.body;
  if (access.length !== 6) {
    return res.status(400).json({
      status: false,
      error: 'Invalid Access'
    });
  };

  Member.findOne( { access })
    .then(member => {
      if (member) {
        return res.status(404).json({
          status: false,
          error: 'Token in use'
        });
      }
      AccessToken.findOneAndRemove({ token:access}, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to delete'
          });
        }

        return res.status(200).json({
          status: true,
          message: 'Deleted Token',
          data: access
        });

      });   
      
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to delete accessTokens'
      });

    });
};


module.exports = { getAccessTokens, createAccessToken, updateAccessTokenById, 
  confirmAccessTokens, toggleTokenValidity, deleteAccessToken};