const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { validationResult } = require("express-validator");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const EmailService = require("../helpers/sendEmail");
const Member = require("../models/Member");
const Profile = require("../models/Profile");
const memberAuthReducer = require("../helpers/memberAuthReducer");
const { getDataURI } = require("../helpers/dataURI");
const { cloudinaryUploader } = require("../config/cloudinaryConfig");
const {
  FRONTEND_URL,
  ADMIN_EMAIL,
  ALLOWED_STATUS,
} = require("../config/constants");
const {
  getPasswordRestLinkMessage,
  getOnboardingMessage,
} = require("../config/messages");
const getExcelTpJSON = require("../helpers/excelToJSON");
const getAllMembers = (req, res) => {
  Member.find({})
    .select("-password")
    .then((members) => {
      let formatedMemberList =
        members.length > 0
          ? members.map((member) => ({
              _id: member._id,
              access: member.access,
              firstname: member.firstname,
              lastname: member.lastname,
              // middlename: member.middlename,
              email: member.email,
              status: member.status,
              phone: member.phone,
              auth: member.auth,
              createdAt: moment(member.createdAt).format("DD/MM/YYYY"),
              updatedAt: moment(member.updatedAt).format("DD/MM/YYYY"),
            }))
          : members;
      return res.status(200).json({
        status: true,
        message: "List of Members",
        data: formatedMemberList,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to get members",
        error: err,
      });
    });
};

const membersRegistrationByUpload = (req, res) => {
  const exceltojson = getExcelTpJSON(req);

  try {
    exceltojson(
      {
        input: req.file.path, //the same path where we uploaded our file
        output: null, //since we don't need output.json
        lowerCaseHeaders: true,
      },
      function (err, result) {
        if (err) {
          return res.status(500).json({
            status: false,
            error: "Failed to parse excel file",
            data: err,
          });
        }
        // console.log('Results of converted file', result)
        const hashedData = result.map((row) => {
          if (row.password) {
            row.password = bcrypt.hashSync(row.password, 12);
          }
          return row;
        });
        // console.log('Results of hashed data', hashedData)

        Member.insertMany(hashedData, { ordered: false })
          .then((list) => {
            let mailingList = [];
            let smsList = [];

            list.map((row) => {
              mailingList.push(row.email);
              smsList.push(row.phone);
            });
            console.log("Email Notification list", mailingList);
            const ONBBOARDING_MESSAGE = getOnboardingMessage();
            const msg = {
              to: mailingList,
              from: ADMIN_EMAIL,
              subject: "New Account",
              text: "and easy to do anywhere, even with Node.js",
              html: ONBBOARDING_MESSAGE,
            };
            EmailService.send(msg)
              .then((response) => {
                return res.status(201).json({
                  status: true,
                  message: `Members uploaded, Email sent`,
                  data: response,
                });
              })
              .catch((err) => {
                console.log("Err ", err);
                return res.status(500).json({
                  status: false,
                  message: "Members uploaded, Email not sent",
                  error: err,
                });
              });
          })
          .catch((e) => {
            console.log("bulkinsert err", e);
            return res.status(500).json({
              status: false,
              message: "Failed to uplaod list",
              error: e,
            });
          });
      }
    );
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: "Failed to process file",
      error: e,
    });
  }
};

// Register/Signup new members
const registerMember = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: "Invalid user inpute",
      error: errorsContainer.errors.map((err) => err.msg),
    });
  }
  // ?Passed all validations
  const {
    access,
    firstname,
    middlename,
    lastname,
    email,
    phone,
    password,
  } = req.body;

  // console.log('Access ID ', accessId)
  Member.findOne({ email })
    .then((member) => {
      if (member) {
        return res.status(401).json({
          error: "Member already exists",
        });
      }

      // No member exists
      let memberReq = {
        // Required fields
        access,
        firstname,
        lastname,
        email,
        phone,
        password,
      };

      if (middlename) memberReq.middlename = middlename;
      const newMember = new Member(memberReq);

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return res
            .status(500)
            .json({
              status: false,
              error: "Server error:: Failed to generate salt",
            });

        bcrypt.hash(password, salt, (err, hash) => {
          if (err)
            return res
              .status(500)
              .json({
                status: false,
                error: "Server error:: Failed to hash password",
              });

          newMember.password = hash;
          newMember.save((err) => {
            if (err)
              return res
                .status(500)
                .json({
                  status: false,
                  error: "Invalid credentials! please confirm access token",
                });

            const payload = { memberId: newMember._id, auth: newMember.auth };
            jwt.sign(
              payload,
              process.env.JWT_SECRET_KEY,
              { expiresIn: "24h" },
              (err, token) => {
                if (err)
                  return res
                    .status(500)
                    .json({
                      status: false,
                      error: "Server error:: Failed to generate token",
                    });

                return res.status(201).json({
                  status: true,
                  message: "User signup successful",
                  token,
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to create member",
      });
    });
};

// Login existing users
const loginMember = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: "Invalid user input",
      errors: errorsContainer.errors.map((err) => err),
    });
  }

  // Passed all validations
  const { email, password } = req.body;
  Member.findOne({ email }, (err, member) => {
    if (err)
      return res
        .status(500)
        .json({
          status: false,
          message: "Server error:: Could not retrieve record",
          errors: err,
        });

    if (!member) {
      return res.status(403).json({
        status: false,
        message: "Account does not exist",
        errors: {},
      });
    }

    // User has account
    bcrypt.compare(password, member.password, (err, isMatch) => {
      if (err)
        return res
          .status(500)
          .json({
            status: false,
            message: "Server error:: Failed to compare password",
            errors: err,
          });

      if (!isMatch)
        return res
          .status(401)
          .json({
            status: false,
            message: "Account does not exist",
            errors: {},
          });

      const payload = {
        memberId: member._id,
        access: member.access,
        auth: member.auth,
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 60 * 60 },
        (err, token) => {
          if (err)
            return res
              .status(500)
              .json({
                status: false,
                message: "Server error:: Failed to generate token",
                errors: err,
              });

          return res.status(200).json({
            status: true,
            message: "Member login successful",
            token,
          });
        }
      );
    });
  });
};

const getMemberByToken = (req, res) => {
  const currentMemberId = req.currentMember.memberId;
  Member.findOne({ _id: currentMemberId })
    .select("-password")
    .then((member) => {
      return res.status(200).json({
        status: true,
        message: "Member Data",
        data: member,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to get member",
      });
    });
};

const updateMemberData = (req, res) => {
  const memberId = req.currentMember.memberId;
  const roles = req.currentMember.auth;
  const {
    _id,
    key,
    access,
    firstname,
    middlename,
    lastname,
    email,
    status,
    password,
    phone,
  } = req.body;
  if (!_id || !key || _id !== key) {
    return res.status(400).json({
      status: false,
      message: "Invalid key combination",
    });
  }

  Member.findOne({ _id: key })
    // .select('-password')
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          status: false,
          message: "No member found",
        });
      }

      // Member found
      // const { access, phone, firstname, lastname, middlename, email} = req.body;
      if (firstname) member.firstname = firstname;
      if (lastname) member.lastname = lastname;
      if (middlename) member.middlename = middlename;
      if (email) member.email = email;
      if (status && ALLOWED_STATUS.includes(status)) member.status = status;
      if (access) member.access = access;
      if (phone) member.phone = phone;
      if (password) {
        // Hash it
        const newHash = bcrypt.hashSync(password, 12);
        member.password = newHash;
      }
      member.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Failed to update member",
            err,
          });
        }
        member.password = "";
        return res.status(200).json({
          status: true,
          message: "Updated member data",
          data: member,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Faied to update member",
      });
    });
};

const forgotPassword = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg),
    });
  }

  // passed validations
  const { email } = req.body;
  Member.findOne({ email })
    .then(async (member) => {
      if (!member) {
        return res.status(404).json({
          status: false,
          message: "No such member record exists",
        });
      }

      // Member found send password reset link
      // generate and set password rest token
      member.generatePasswordReset();
      await member.save();
      // console.log('member token', member.resetPasswordToken)

      const link = `${FRONTEND_URL}/password-reset/${member.resetPasswordToken}`;
      // console.log('origin ', req.headers.origin)
      const passwordResetLinkMessage = getPasswordRestLinkMessage(
        member.firstname,
        link
      );
      const msg = {
        to: email,
        from: ADMIN_EMAIL,
        subject: "Password Reset",
        text: "and easy to do anywhere, even with Node.js",
        html: passwordResetLinkMessage,
      };

      EmailService.send(msg)
        .then((response) => {
          return res.status(200).json({
            status: true,
            message: `Password reset link sent to ${email}`,
            data: response,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            message: "Failed to send email",
            errors: err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to retrieve member",
        errors: err,
      });
    });
};

const resetPassword = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg),
    });
  }

  // passed validations
  const { passwordResetToken, password } = req.body;
  Member.findOne({ resetPasswordToken: passwordResetToken })
    .then(async (member) => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: "No such member record exists",
        });
      }

      // Member found
      // Update Password and cancel token
      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return res
            .status(500)
            .json({
              status: false,
              error: "Server error:: Failed to generate salt",
            });

        bcrypt.hash(password, salt, (err, hash) => {
          if (err)
            return res
              .status(500)
              .json({
                status: false,
                error: "Server error:: Failed to hash password",
              });

          member.password = hash;
          member.resetPasswordToken = "";

          member.save((err) => {
            if (err)
              return res
                .status(500)
                .json({
                  status: false,
                  error: "Invalid credentials! please confirm access token",
                });

            return res.status(200).json({
              status: true,
              message: "Password reset successful",
              data: passwordResetToken,
            });
          });
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        errors: "Failed to retrieve member",
      });
    });
};

const updateMemberImage = (req, res) => {
  const memberId = req.currentMember.memberId;
  const dataURI = getDataURI(req);

  if (!dataURI) {
    return res.status(404).json({
      status: false,
      message: "No data found",
    });
  }

  cloudinaryUploader
    .upload(dataURI, { public_id: memberId })
    .then((result) => {
      const { secure_url } = result;

      Member.findOneAndUpdate(
        { _id: memberId },
        { imageUrl: secure_url },
        { upsert: true, new: true }
      )
        .then((member) => {
          return res.status(200).json({
            status: true,
            message: "Updated member profile",
            data: member,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            message: "Could not update data",
            err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Could not upload data",
        err,
      });
    });
};

const manageMemberAuth = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg),
    });
  }
  const { memberId, actionType } = req.body;

  Member.findOne({ _id: memberId })
    .select("-password")
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: "No Such Memneber",
        });
      }
      //  Update Member Auth
      member.auth = memberAuthReducer(member.auth, actionType);
      member.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: "Failed to update member auth",
          });
        }

        return res.status(200).json({
          status: true,
          message: "Member  Auth Updated",
          data: member,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to get member",
      });
    });
};

const toggleMembersAdminAuth = (req, res) => {
  const errorsContainer = validationResult(req);
  if (!errorsContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorsContainer.errors.map((err) => err.msg),
    });
  }
  const { members: requestMembers } = req.body;
  const maxAllowabelAdmins = 3;
  let memberData = {};
  console.log("auth members", requestMembers);
  if (Array.isArray(requestMembers) && requestMembers.length === 1) {
    memberData = requestMembers[0];
  }

  if (Object.keys(memberData).length < 2) {
    return res.status(400).json({
      status: false,
      message: "Invalid request provided",
    });
  }
  Member.find({})
    .select("-password")
    .then((results) => {
      // let requestMemberData = {};
      const existingAdminsList = results.filter((member) =>
        member.auth.includes("admin")
      );
      const vacantAdminSlots = maxAllowabelAdmins - existingAdminsList.length;

      const fullMemberData = results.find(
        (member) => member.email === memberData.email
      );
      // console.log(" requestMemberData", requestMemberData )
      if (!fullMemberData) {
        // No member found from eligibl lis
        return res.status(404).json({
          status: false,
          message: "Ypur request was not found from eligible list",
        });
      }

      const auth = [];
      const isAlreadyAdmin = memberData.auth.includes("admin");
      if (vacantAdminSlots === 0) {
        if (isAlreadyAdmin) {
          fullMemberData.auth = fullMemberData.auth.filter(
            (role) => role !== "admin"
          );
        }
      } else {
        // toggle
        if (isAlreadyAdmin) {
          fullMemberData.auth = fullMemberData.auth.filter(
            (role) => role !== "admin"
          );
        } else {
          fullMemberData.auth = fullMemberData.auth.concat("admin");
        }
      }

      fullMemberData.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Failed to update member auth",
            error: err,
          });
        }

        return res.status(200).json({
          status: true,
          message: "Member Admin Auth Updated",
          data: fullMemberData,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to get member",
        error: err,
      });
    });
};

const toggleMemberAdminAuthByMemberId = (req, res) => {
  const { memberId } = req.params;
  Member.findOne({ _id: memberId })
    .select("-password")
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          status: false,
          error: "No Such Memneber",
        });
      }

      if (!member.auth.includes("admin")) {
        member.auth = [...member.auth, "admin"];
      } else {
        member.auth = member.auth.filter((auth) => auth !== "admin");
      }

      member.save((err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            error: "Failed to update member auth",
          });
        }

        return res.status(200).json({
          status: true,
          message: "Member Admin Auth Updated",
          data: member,
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to get member",
      });
    });
};

const deleteMembersByIds = async (req, res) => {
  // const { memberId } = req.params;
  // console.log("removing member ", req.body)
  const { members } = req.body;
  Member.find({ email: { $in: members } })
    .then((results) => {
      // console.info("members to be deleted ", results)
      const deleteResult = results.map(async (member) => await member.remove());
      console.info("members to be deledeleteResultted ", deleteResult);
      return res.status(200).json({
        status: true,
        message: "Deleted member",
        data: deleteResult,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: "Failed to delete members",
        err,
      });
    });
};

const deleteMembers = (req, res) => {
  const { id } = req.query;
  let filter = {};
  if (id) filter._id = id;
  console.info("Deleting users with ids", filter);
  Member.find(filter)
    .then((users) => {
      if (users.length < 1) {
        return res.status(500).json({
          status: false,
          message: "No User available",
        });
      }

      const removedUsers = users.map(async (user) => await user.remove());
      return res.status(200).json({
        status: true,
        message: "Members successfully removed",
        data: removedUsers,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Failed to delete users",
        error: err,
      });
    });
};

module.exports = {
  membersRegistrationByUpload,
  getAllMembers,
  loginMember,
  registerMember,
  toggleMembersAdminAuth,
  toggleMemberAdminAuthByMemberId,
  updateMemberData,
  forgotPassword,
  resetPassword,
  manageMemberAuth,
  getMemberByToken,
  deleteMembersByIds,
  updateMemberImage,
  deleteMembers,
};
