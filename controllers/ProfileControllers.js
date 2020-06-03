const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');

const getProfilesByFilter = (req, res) => {
  let filter = {};
  const { memberId, group} = req.query;
  
  Profile.find(filter)
    .populate({
      path: 'member',
      select: ['firstname', 'middlename', 'lastname', 'email', 'access'],
      model: Member
    })
    .then(profiles => {

      return res.status(200).json({
        status: true,
        message: 'List of Profiles',
        count: profiles.length,
        data: profiles
      });
    })
    .catch(err => {

      return res.status(500).json({
        status: false,
        error: 'Failed to get profiles'
      });

    });
};

const createProfile = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map(err => err.msg)
    });
  }
  const member = req.currentMember.memberId;
  const access = req.currentMember.access;

  const {
    title,
    // member,
    // access,
    group,
    // General
    vocal_part,
    rehearsal_location,
    gender,
    // personal
    phone,
    whatsapp_phone,
    contact_address,
    pha,
    dob,
    wed_date,
    marital_status,
    work_status,
    profession,
    employer_name,
    employer_address,
    state_origin,
    nationality,
    // NOK
    nok_name,
    nok_address,
    nok_phone,
    nok_occupation,
    nok_relation,
    nok_email,
    // Choir roles
    membership_status,
    leadership_status,
    sub_group,
    // Church Info
    wsf_status,
    new_birth_year,
    holy_spirit_year,
    lfc_joined_year,
    ordination_year,
    province,
    district,
    zone
  } = req.body;
  
  let profile = {};
  if (title) profile.title = title;
  if (member) profile.member = member;
  if (access) profile.access = access;
  if (group) profile.group = group;

   profile.general = {};
  if (vocal_part) profile.general.vocal_part = vocal_part;
  if (rehearsal_location) profile.general.rehearsal_location = rehearsal_location;
  if (gender) profile.general.gender = gender;
  
  profile.personal = {};
  if (phone) profile.personal.phone = phone;
  if (whatsapp_phone) profile.personal.whatsapp_phone = whatsapp_phone;
  if (contact_address) profile.personal.contact_address = contact_address;
  if (pha) profile.personal.pha = pha;
  if (dob) profile.personal.dob = dob;
  if (wed_date) profile.personal.wed_date = wed_date;
  if (marital_status) profile.personal.marital_status = marital_status;
  if (work_status) profile.personal.work_status = work_status;
  if (profession) profile.personal.profession = profession;
  if (employer_name) profile.personal.employer_name = employer_name;
  if (employer_address) profile.personal.employer_address = employer_address;
  if (state_origin) profile.personal.state_origin = state_origin;
  if (nationality) profile.personal.nationality = nationality;
  
  profile.nok = {};
  if (nok_name) profile.nok.nok_name = nok_name;
  if (nok_address) profile.nok.nok_address = nok_address;
  if (nok_phone) profile.nok.nok_phone = nok_phone;
  if (nok_occupation) profile.nok.nok_occupation = nok_occupation;
  if (nok_relation) profile.nok.nok_relation = nok_relation;
  if (nok_email) profile.nok.nok_email = nok_email;
  
  profile.choir_roles = {};
  if (membership_status) profile.choir_roles.membership_status = membership_status;
  if (leadership_status) profile.choir_roles.leadership_status = leadership_status;
  if (sub_group) profile.choir_roles.sub_group = sub_group;
  
  profile.church_info = {};
  if (wsf_status) profile.church_info.wsf_status = wsf_status;
  if (new_birth_year) profile.church_info.new_birth_year = new_birth_year;
  if (holy_spirit_year) profile.church_info.holy_spirit_year = holy_spirit_year;
  if (lfc_joined_year) profile.church_info.lfc_joined_year = lfc_joined_year;
  if (ordination_year) profile.church_info.ordination_year = ordination_year;
  if (province) profile.church_info.province = province;
  if (district) profile.church_info.district = district;
  if (zone) profile.church_info.zone = zone;
 
    
   Profile.findOneAndUpdate({ member }, profile , { new: true, upsert: true})
    .then(profile => {
      
      return res.status(200).json({
        status: true,
        message: 'Updated profile',
        data: profile
      });

    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        error: 'Failed to fetch profile'
      });
    });

}

// A member can delete his profile in which case, he can recreate it
const deleteProfile = (req, res) => {
  const currentMemberId = req.currentMember.memberId;

  Profile.findOneAndRemove({ member: currentMemberId }, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        error: 'Failed to delete profile'
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Deleted profile',
      data: currentMemberId,
      result
    });

  });
}
module.exports = { getProfilesByFilter, createProfile, deleteProfile };