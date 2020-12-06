const fastcsv = require("fast-csv");
const fs = require("fs");
const path = require('path');
const convertapi = require('convertapi')(process.env.CONVERTAPI_KEY);
const Profile = require('../models/Profile');
const Member = require('../models/Member');

const formatReportData = require('../helpers/formatReportData')

const generateReportForProfiles = (req, res) => {
  // console.log('called report')
  Profile.find({})
    .populate({
      path: 'member',
      select: ['firstname', 'middlename', 'lastname', 'email', 'imageUrl'],
      model: Member
    })
    .then(profiles => {
      if (profiles.length < 1) {
         return  res.status(400).json({
            status: false,
            error: 'No reports'
          })
      }
      
      console.log('profiles lingth', profiles.length);
      // console.log('profiles one', profiles[0]);

      let reportData = formatReportData(profiles);

      console.log('report count ', reportData.length)

      console.log('report data test ', reportData[50])
      if (!reportData) {
        return  res.status(400).json({
            status: false,
            error: 'No reports: failed to generate report'
          })
      }
    
    // Convert JSON to Bufferls
    // const reportBuffer = Buffer.from(JSON.stringify(reportData));
    // Get Data URI
    let _reportData = JSON.stringify(reportData);

      const path2file = "reports/master_" + Date.now() + "_report.csv";
      const ws = fs.createWriteStream(path2file);
      // console.log('repord', reportData)
      fastcsv
        .write(JSON.parse(_reportData), { headers: true })
        .on("finish", function () {
          console.log("Write to master lis successfully!", ws.path);
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
            console.log('error  ', err)
            return  res.status(500).json({
              status: false,
              error: 'Failed to generate profiles report',
              err
            })
            
          });

        })
        .pipe(ws);
      
    })
    .catch(err => {
      return  res.status(500).json({
          status: false,
          error: 'Failed to get profiles',
          err
        })
    })

}

module.exports = {
  generateReportForProfiles
}