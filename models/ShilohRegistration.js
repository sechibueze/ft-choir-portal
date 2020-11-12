const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShilohRegistrationSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Member'
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Profile'
  },
  accessId: {
    type: String,
    unique: true,
    required: true
  },
  otp: {
    type: String,
    unique: true,
    required: true
  },
  availability: {
    type: Array,
    default:[],
    required: true
  },
  accomodation: {
    type: String,
    required: true,
    default: ''
  }
}, { timestamps: true });



module.exports = ShilohRegistration = mongoose.model('ShilohRegistration', ShilohRegistrationSchema);