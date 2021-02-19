const mongoose = require('mongoose');
const crypto = require('crypto');
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

/**
 * This is the middleware, It will be called before saving any record
 */
// MemberSchema.pre('save', async function(next) {

//   // check if password is present and is modified.
//   if ( this.password && this.isModified('password') ) {

//     // call your hashPassword method here which will return the hashed password.
//     try {

//       //this.password = bcrypt.hashSync(this.password, 10);
//     } catch (error) {
//       console.info('There is an error in hashing password', error)
//     }

//   }

//   // everything is done, so let's call the next callback.
//   next();

// });
MemberSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = Member = mongoose.model('member', MemberSchema);