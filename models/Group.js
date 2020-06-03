const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true});

module.exports = Group = mongoose.model('group', GroupSchema);