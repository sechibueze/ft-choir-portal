const { validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const Member = require("../models/Member");

// Get All Profiles in DB
const getAllProfiles = (req, res) => {
  Profile.find({})
    .populate({
      path: "member",
      select: ["firstname", "middlename", "lastname", "email", "accessId"],
      model: Member,
    })
    .then((profiles) => {
      return res.status(200).json({
        status: true,
        message: "List of Profiles",
        data: profiles,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to get profiles",
        error: err,
      });
    });
};

// Get Profiles by Id in @params
const getProfileById = (req, res) => {
  const { profileId } = req.params;
  if (!profileId) {
    return res.status(400).json({
      status: false,
      message: "No Profile Identifier specified",
    });
  }
  Profile.findOne({ _id: profileId })
    .populate({
      path: "member",
      select: [
        "firstname",
        "middlename",
        "lastname",
        "email",
        "access",
        "auth",
        "imageUrl",
        "phone",
      ],
      model: Member,
    })
    .then((profile) => {
      if (!profile) {
        return res.status(200).json({
          status: false,
          message: "Profile not found",
          data: profile,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Requested Profile data",
        data: profile,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to get profiles",
      });
    });
};

// Get Profiles by member Id in @params
const getProfileByMemeberId = (req, res) => {
  const { memberId } = req.params;
  if (!memberId) {
    return res.status(400).json({
      status: false,
      message: "No Profile Identifier specified",
    });
  }
  Profile.findOne({ member: memberId })
    .populate({
      path: "member",
      select: [
        "firstname",
        "middlename",
        "lastname",
        "email",
        "imageUrl",
        "access",
        "phone",
      ],
      model: Member,
    })
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({
          status: false,
          error: "Profile not found",
        });
      }
      // console.log("p m", profile.member);
      return res.status(200).json({
        status: true,
        message: "Requested Profile data",
        data: profile,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to get profiles",
      });
    });
};

// Get Profiles by Id in @params
const getCurrentMemberProfile = (req, res) => {
  const memberId = req.currentMember.memberId;
  if (!memberId) {
    return res.status(400).json({
      status: false,
      message: "No Profile Identifier specified",
    });
  }

  Member.findOne({ _id: memberId })
    .then((member) => {
      if (!member) {
        return res.status(400).json({
          status: false,
          message: "No account exists for you",
        });
      }

      Profile.findOne({ member: memberId })

        .then((profile) => {
          if (!profile) {
            return res.status(200).json({
              status: false,
              message: "No profile yet, create one",
              data: profile,
            });
          }

          profile.member = member;

          return res.status(200).json({
            status: true,
            message: "Requested Profile data",
            data: profile,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            message: "Failed to get profile",
            err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to get member",
        err,
      });
    });
};

// Create or update profiles
const createProfile = (req, res) => {
  const member = req.currentMember.memberId;
  console.log("member data ", req.currentMember);
  Member.findOne({ _id: member })
    .then((memberData) => {
      if (!memberData) {
        return res.status(500).json({
          status: false,
          message: "Failed to created/update profile",
          err,
        });
      }

      const {
        _id,
        title,
        gender,
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
      } = req.body;

      let profile = {};
      profile.member = _id ? _id : memberData._id;
      if (title) profile.title = title;
      if (gender) profile.gender = gender;
      if (phone) profile.phone = phone;
      if (whatsapp_phone) profile.whatsapp_phone = whatsapp_phone;
      if (contact_address) profile.contact_address = contact_address;
      if (pha) profile.pha = pha;
      if (dob) profile.dob = dob;
      if (wed_date) profile.wed_date = wed_date;
      if (marital_status) profile.marital_status = marital_status;
      if (work_status) profile.work_status = work_status;
      if (profession) profile.profession = profession;
      if (employer_name) profile.employer_name = employer_name;
      if (employer_address) profile.employer_address = employer_address;
      if (state_origin) profile.state_origin = state_origin;
      if (nationality) profile.nationality = nationality;

      // If profile, update else create
      Profile.findOneAndUpdate({ member }, profile, { upsert: true, new: true })
        .then((profile) => {
          // console.log('Updated ', profile)
          return res.status(200).json({
            status: true,
            message: "Created/Updated profile",
            data: profile,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            message: "Failed to created/update profile",
            err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Could not find a member, please craete an account",
        err,
      });
    });
};

const updateNOKInfo = (req, res) => {
  const member = req.currentMember.memberId;
  // let filter = {};
  const {
    // NOK
    _id,
    nok_name,
    nok_address,
    nok_phone,
    nok_occupation,
    nok_relation,
    nok_email,
  } = req.body;
  const filter =
    _id && req.currentMember.auth.includes("admin") ? { _id } : { member };

  Profile.findOne(filter)
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({
          status: false,
          message: "No profile found",
          data: profile,
        });
      }

      // Profile was found
      if (nok_name) profile.nok.nok_name = nok_name;
      if (nok_address) profile.nok.nok_address = nok_address;
      if (nok_phone) profile.nok.nok_phone = nok_phone;
      if (nok_occupation) profile.nok.nok_occupation = nok_occupation;
      if (nok_relation) profile.nok.nok_relation = nok_relation;
      if (nok_email) profile.nok.nok_email = nok_email;

      profile.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Cannot Update NOK profile",
          });
        }
        return res.status(200).json({
          status: true,
          message: "Updated NOK profile",
          data: profile,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to fetch profile",
      });
    });
};
const updateUnitInfo = (req, res) => {
  const member = req.currentMember.memberId;
  const {
    _id,
    group,
    vocal_part,
    rehearsal_location,
    membership_status,
    leadership_status,
    sub_group,
  } = req.body;
  const filter =
    _id && req.currentMember.auth.includes("admin") ? { _id } : { member };

  Profile.findOne(filter)
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({
          status: false,
          message: "Missen profile",
          data: profile,
        });
      }

      if (group) profile.unit_info.group = group;
      if (vocal_part) profile.unit_info.vocal_part = vocal_part;
      if (rehearsal_location)
        profile.unit_info.rehearsal_location = rehearsal_location;
      if (membership_status)
        profile.unit_info.membership_status = membership_status;
      if (leadership_status)
        profile.unit_info.leadership_status = leadership_status;
      if (sub_group) profile.unit_info.sub_group = sub_group;

      profile.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: "Cannot Update Unit Info profile",
          });
        }
        return res.status(200).json({
          status: true,
          message: "Updated Unit info profile",
          data: profile,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to Update Unit Info profile",
      });
    });
};
const updateChurchInfo = (req, res) => {
  const member = req.currentMember.memberId;
  const {
    // Church Info
    _id,
    wsf_status,
    new_birth_year,
    holy_spirit_year,
    lfc_joined_year,
    ordination_year,
    province,
    district,
    zone,
  } = req.body;
  const filter =
    _id && req.currentMember.auth.includes("admin") ? { _id } : { member };
  Profile.findOne(filter)
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({
          status: false,
          message: "Cannot Updated Church Info profile",
          data: profile,
        });
      }

      // profile.church_info = {};
      if (wsf_status) profile.church_info.wsf_status = wsf_status;
      if (new_birth_year) profile.church_info.new_birth_year = new_birth_year;
      if (holy_spirit_year)
        profile.church_info.holy_spirit_year = holy_spirit_year;
      if (lfc_joined_year)
        profile.church_info.lfc_joined_year = lfc_joined_year;
      if (ordination_year)
        profile.church_info.ordination_year = ordination_year;
      if (province) profile.church_info.province = province;
      if (district) profile.church_info.district = district;
      if (zone) profile.church_info.zone = zone;

      profile.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Cannot Update Church Info profile",
          });
        }
        return res.status(200).json({
          status: true,
          message: "Updated Church profile",
          data: profile,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to fetch profile",
      });
    });
};

// A member can delete his profile in which case, he can recreate it
const deleteProfiles = (req, res) => {
  // const currentMemberId = req.currentMember.memberId;
  console.log("profiles to delete", req.body);
  const { profiles } = req.body;

  Profile.find({ _id: { $in: profiles } }, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to delete profile",
        err,
      });
    }
    if (results.length < 1) {
      return res.status(400).json({
        status: false,
        message: "No profile found",
      });
    }

    results.map(async (doc) => doc.remove());

    return res.status(200).json({
      status: true,
      message: "Deleted profile",
      data: profiles,
    });
  });
};
module.exports = {
  getAllProfiles,
  getProfileById,
  getCurrentMemberProfile,
  createProfile,
  updateNOKInfo,
  updateUnitInfo,
  updateChurchInfo,
  getProfileByMemeberId,
  deleteProfiles,
};
