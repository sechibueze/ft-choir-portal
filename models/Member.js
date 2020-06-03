const mongoose = require('mongoose');

const { Schema } = mongoose;

const MemberSchema = new Schema({
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
  password: {
    type: String,
    required: true
  },
  access: {
    type: String,
    ref: 'AccessToken',
    required: true,
    trim: true,
    unique: true
  },
  auth: {
    type: Array,
    default: ['member']
  },
}, { timestamps: true });

module.exports = Member = mongoose.model('member', MemberSchema);