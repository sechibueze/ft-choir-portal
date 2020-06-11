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
  imageUrl: {
    type: String,
    default: ''
  },
  
  auth: {
    type: Array,
    default: ['member']
  },
}, { timestamps: true });

module.exports = Member = mongoose.model('member', MemberSchema);