const mongoose = require("mongoose");

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    attendance: [
      {
        access: {
          type: String,
          required: true,
        },
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
