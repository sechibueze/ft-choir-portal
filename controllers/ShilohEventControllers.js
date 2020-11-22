const { validationResult } = require('express-validator');
const convertapi = require('convertapi')(process.env.CONVERTAPI_KEY);
const fastcsv = require("fast-csv");
const fs = require("fs");
const Member = require('../models/Member');
const Profile = require('../models/Profile');
const ShilohRegistration = require('../models/ShilohRegistration');



/**** Register for Shiloh  */
const handleShilohEventRegistration = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errors.array().map(e => e.msg)
    });
  }

  // Passed validations
  const { availability, accomodation } = req.body;
  const memberId = req.currentMember.memberId;
  Profile.findOne({member: memberId})
    .populate({
      path: 'member',
      select: ['firstname', 'middlename', 'lastname', 'email', 'accessId', 'imageUrl'],
      model: Member
    })
    .then(memberProfileData => {
      
      if (!memberProfileData) {
        return res.status(401).json({
          status: false,
          errors: ['You need to update your profile first']
        })
      }

      const {
         gender, phone, 
         member: { firstname, lastname, accessId }, 
         unit_info: { group, vocal_part },
         imageUrl
        } = memberProfileData;
      
      if (!gender || !phone || !firstname || !lastname || !group || !vocal_part || imageUrl) {
        return res.status(401).json({
          status: false,
          errors: ['Incomplete profile']
        })
      }

      let shilohRegistration = {
        member: memberId,
        profile: memberProfileData._id,
        accessId,
        otp: Math.floor(Math.random() * 10000000),
        gender,
        group,
        vocal_part,
        phone,
        availability,
        accomodation
      };
      let newShilohRegistration = new ShilohRegistration(shilohRegistration);
      newShilohRegistration.save(err => {
        if (err) return res.status(500).json({ status: false, errors: ['Confirm you have not registered'] });

        // New Post saved
        return res.status(201).json({
          status: true,
          message: 'New Shiloh registration complete',
          data: newShilohRegistration._id
        });
      })
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, errors: ['Internal Server Error:: failed to register '] });
    });
  
}

/**** Get All Shiloh Registrations */
const getAllShilohEventAttendees = (req, res) => {
  let filter = {};
  const memberId = req.currentMember.memberId;
  // Already authenticated with token
  ShilohRegistration.find({})
    .populate({
      path: 'member',
      select: ['firstname', 'lastname', 'email'],
      model: Member
    })
    .populate({
      path: 'profile',
      select: ['gender', 'phone', 'unit_info'],
      model: Profile
    })
    .then(attendees => {
      // if (!posts) return res.status(401).json({ status: false, errors: ['Internal Server Error:: No Post is available'] });

      // Posts exists at least []
      return res.status(200).json({
        status: true,
        message: 'All attendees',
        data: attendees
      });
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, errors: ['Internal Server Error:: failed to get all posts'] });
    });
}

/**** Get Attendee by Id */
const getShilohAttendeeById = (req, res) => {
  // Already authenticated with token
  const {accessId} = req.params;
  if (!accessId || accessId.length !== 9) return res.status(401).json({ status: false, errors: ['Unauthorized! No/invalid ID supplied'] });
  const filter = { accessId };
  ShilohRegistration.findOne(filter)
    .populate({
      path: 'member',
      select: ['firstname', 'lastname', 'email', 'accessId'],
      model: Member
    })
    .then(attendee => {
      
      if (!attendee) return res.status(401).json({ status: false, errors: ['No Attendee with that ID'] });
      // Posts exists at least []
      return res.status(200).json({
        status: true,
        message: 'Found Attendee',
        data: attendee
      });
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, errors: ['Internal Server Error:: failed to get attendees'] });
    });
}

/**** REmove Attendee by Id */
const updateShilohAttendeeById = (req, res) => {
  // Already authenticated with token
  const {memberId} = req.currentMember;
  const {accessId} = req.params;
  if (!accessId || accessId.length !== 9 || !memberId) return res.status(401).json({ status: false, errors: ['Unauthorized! No/invalid ID supplied'] });
  const filter = { accessId, member: memberId };
  ShilohRegistration.findOne(filter)
    .then(attendee => {
      if (!attendee) return res.status(401).json({ status: false, errors: ['No such record exists found'] });
      
      const { availability, accomodation } = req.body;
      if(availability) attendee.availability = availability;
      if(accomodation) attendee.accomodation = accomodation;

      attendee.save(err => {
        
        if (err) return res.status(500).json({ status: false, errors: ['Failed to attendee attendee'] });
        
        return res.status(200).json({
          status: true,
          message: 'Updated Attendee',
          data: attendee._id
        });
      })
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, errors: ['Internal Server Error:: failed to get attendees'] });
    });
}
/**** REmove Attendee by Id */
const removeShilohAttendeeById = (req, res) => {
  // Already authenticated with token
  const {accessId} = req.params;
  if (!accessId || accessId.length !== 9) return res.status(401).json({ status: false, errors: ['Unauthorized! No/invalid ID supplied'] });
  const filter = { accessId };
  ShilohRegistration.findOne(filter)
    
    .then(attendee => {
      if (!attendee) return res.status(401).json({ status: false, errors: ['No Attendee was found'] });
      
      attendee.remove(err => {
        
        if (err) return res.status(500).json({ status: false, errors: ['Failed to remove attendee'] });
        
        return res.status(200).json({
          status: true,
          message: 'Removed Attendee',
          data: attendee._id
        });
      })
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, errors: ['Internal Server Error:: failed to get attendees'] });
    });
}

/**** REPORT Attendee by Id */
const generateShilohAttendanceReport = (req, res) => {
  
  ShilohRegistration.find({})
      .populate({
        path: 'member',
        select: ['firstname', 'lastname', 'email'],
        model: Member
      })
      .populate({
        path: 'profile',
        select: ['gender', 'phone', 'unit_info'],
        model: Profile
      })
    .then(list => {
      if (!list || list.length < 1) return res.status(401).json({ status: false, errors: ['No Attendee was found'] });
      
      let attendanceList = list.map(attendee => {
        const {
          accomodation, 
          availability,
          member: {firstname, lastname, email },  
          profile: { gender, phone, unit_info: { vocal_part, group }},
          otp,
          accessId
        } = attendee;
        
      let row = { 
        accessId,
        otp,
        firstname, lastname, 
        email, 
        gender, 
        availability: availability.join(','), 
        accomodation, 
        vocal_part, 
        group, 
        phone,
      };

        return row
      })
      attendanceList = JSON.stringify(attendanceList)
      const path2file = "reports/shiloh_" + Date.now() + "_report.csv";
      const ws = fs.createWriteStream(path2file);
    
      try {
        fastcsv
          .write(JSON.parse(attendanceList), { headers: true })
          .on("finish", function () {
            // convert the .csv to .xlsx
            convertapi.convert('xlsx', {
              File: ws.path
            }, 'csv').then(function (result) {
              console.log('url : ', result.file.url);
              const data = result.file.url;
              return res.status(200).json({
                    status: true,
                    message: 'Report data',
                    data
                  })
            }).catch(err => {
              return  res.status(500).json({
                status: false,
                error: 'Failed to generate profiles report',
              
              })
              
            });

          })
          .pipe(ws);
      } catch (err) {
        return  res.status(500).json({
            status: false,
            error: 'Failed to parse file',
            err: list
          })
      }
        
      })
      .catch(err => {
        return  res.status(500).json({
            status: false,
            error: 'Failed to get attendees vv',
            err
          })
      })

    
}


module.exports = { 
 handleShilohEventRegistration,
 getAllShilohEventAttendees,
 getShilohAttendeeById,
 updateShilohAttendeeById,
 removeShilohAttendeeById,
 generateShilohAttendanceReport
};