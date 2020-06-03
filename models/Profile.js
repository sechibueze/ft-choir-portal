const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  access: {
    type: String,
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  general: {
    vocal_part: {
      type: String,
      default: ""
    },
    rehearsal_location: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      default: ""
    }
  },
  personal: {
    phone: {
      type: String,
      default: ""
    },
    whatsapp_phone: {
      type: String,
      default: ""
    },
    contact_address: {
      type: String,
      default: ""
    },
    pha: {
      type: String, default: ""
    },
    dob: {
      type: Date, default: ""
    },
    wed_date: {
      type: Date, default: ""
    },
    marital_status: {
      type: String,
      ddefault: ""
    },
    work_status: {
      type: String,
      default: ""
    },
    profession: {
      type: String,
      default: ""
    },
    employer_name: {
      type: String,
      default: ""
    },
    employer_address: {
      type: String,
      default: ""
    },
    state_origin: {
      type: String,
      default: ""
    },
    nationality: {
      type: String,
      default: 'Nigeria'
    }
  },
  nok: {
    nok_name: {
      type: String,
      default: ""
    },
    nok_address: {
      type: String,
      default: ""
    },
    nok_phone: {
      type: String,
      default: ""
    },
    nok_occupation: {
      type: String,
      default: ""
    },
    nok_relation: {
      type: String,
      default: ""
    },
    nok_email: {
      type: String,
      default: ""
    }
  },
  choir_roles: {
    membership_status: {
      type: String,
      default: ""
    },
    leadership_status: {
      type: String,
      default: ""
    },
    sub_group: {
      type: String,
      default: ""
    }
  },
  church_info: {
    wsf_status: {
      type: String,
      default: ""
    },
    new_birth_year: {
      type: Date,
      default: ""
    },
    holy_spirit_year: {
      type: Date,
      default: ""
    },
    lfc_joined_year: {
      type: Date,
      default: Date.now
    },
    ordination_year: {
      type: Date,
      default: ""
    },
    province: {
      type: String,
      default: ""
    },
    district: {
      type: String,
      default: ""
    },
    zone: {
      type: String,
      default: ""
    }
  }
  
}, { timestamps: true });

module.exports = Profile = mongoose.model('profile', ProfileSchema);