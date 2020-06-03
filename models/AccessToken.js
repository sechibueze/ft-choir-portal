const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccessTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  isValid: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = AccessToken = mongoose.model('accesstoken', AccessTokenSchema);