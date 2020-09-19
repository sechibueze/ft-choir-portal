const mongoose = require('mongoose');

const { Schema } = mongoose;

const AllowListSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    required: true
  }
}, { timestamps: true});

module.exports = AllowList = mongoose.model('allowlist', AllowListSchema);