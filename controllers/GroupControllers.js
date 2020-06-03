const { validationResult } = require('express-validator');
const Group = require('../models/Group');
const Profile = require('../models/Profile');

// Get a list of all groups to the Admin
const getAllGroups = (req, res) => {

  Group.find({})
    .then(groups => {
      return res.status(200).json({
        status: true,
        message: 'List of Groups',
        data: groups
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get groups'
      });

    });
};

// Create a new Group
const createGroup = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }

  // Passed all validations
  const { name } = req.body;
  const newGroup = new Group({ name });
  newGroup.save(err => {
    if (err) {
      return res.status(500).json({
        status: false,
        error: 'Failed to create group'
      });
    }

    return res.status(201).json({
      status: true,
      message: 'Group created',
      data: newGroup
    });
  });
};

// Update  Group name
const updateGroupById = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  const { groupId } = req.params;
  if (!groupId) {
    return res.status(400).json({
      status: false,
      error: 'A group ID is required'
    });
  }

  Group.findOne({_id: groupId})
    .then(group => {

      if (!group) {
        return res.status(404).json({
          status: false,
          error: 'Group Not Found'
        });
      };

      // Found Group
      const { name } = req.body;
      if(name) group.name = name;


      group.save(err => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: 'Failed to update group'
          });
        }

        return res.status(201).json({
          status: true,
          message: 'Group updated',
          data: group
        });
      });
    })
    .catch(err => {
      if (err) {
        return res.status(500).json({
          status: false,
          error: 'Cannot find the group requested'
        });
      }
    });
  
};

// Get a list of all groups to the Admin
const getAllGroupMembers = (req, res) => {
  const { groupId } = req.params;
  Profile.find({group: groupId})
    .then(members => {
      return res.status(200).json({
        status: true,
        message: 'List of Group members',
        data: members
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get group members'
      });

    });
};

module.exports = { getAllGroups, createGroup, updateGroupById, getAllGroupMembers };