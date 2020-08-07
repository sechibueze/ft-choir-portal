
module.exports = function (jsonData) {
  // let reportData = req.session.users;
    // work on reportData
    const userList = req.session.users;
    // const jsonData = JSON.parse(JSON.stringify(reportData));
    const jsonData = JSON.parse(reportData(userList));
    // console.log("jsonData => ", jsonData)

    const path2file = "reports/master_" + Date.now() + "_report.csv";
    const ws = fs.createWriteStream(path2file);

    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function () {

        console.log("Write to master lis successfully!", ws.path);
        // convert the .csv to .xlsx
        convertapi.convert('xlsx', {
          File: ws.path
        }, 'csv').then(function (result) {
          console.log('url : ', result.file.url);
          data.download_url = result.file.url;
          return 
        }).catch(e => {

          data.message = 'Failed to generate report';
          return res.render('dashboard', { data });
        });

      })
      .pipe(ws);

}