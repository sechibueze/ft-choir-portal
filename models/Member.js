const mongoose = require('mongoose');
const crypto = require('crypto');
const Profile = require('./Profile');

const { ALLOWED_STATUS } = require('../config/constants');
const { Schema } = mongoose;

const MemberSchema = new Schema({
  access: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  group: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: '08136363673'
  },
  status: {
    type: String,
    enum: ALLOWED_STATUS,
    default: 'active'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetPasswordExpires: {
    type: String,
    default: ''
  },
  auth: {
    type: Array,
    default: ['member']
  },
}, { timestamps: true });


MemberSchema.pre('remove', function(next) {
  console.log('Removing refs for ', this._id, 'from profiles')
  Profile.findOne({ member: this._id}).exec()
  .then(async doc => await doc.remove())
  .catch(err => console.log("Failed to remove refs", { err }))
  next();
});

MemberSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model('Member', MemberSchema);