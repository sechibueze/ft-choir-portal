const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  title: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  likes: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
      }
    }
  ],
  comments: [
    {
      member:{
        type: Schema.Types.ObjectId,
        ref: 'Member'
      },
      comment: {
        type: String,
        required: true
      },
      image: {
        type: String,
        default: ''
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true});

module.exports = mongoose.model('post', PostSchema);