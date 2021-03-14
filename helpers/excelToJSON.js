const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
module.exports = function (req) {
  let exceltojson; //Initializatio

  // Use appropriate extensiom
  if (
    req.file.originalname.split(".")[
      req.file.originalname.split(".").length - 1
    ] === "xlsx"
  ) {
    exceltojson = xlsxtojson;
  } else {
    exceltojson = xlstojson;
  }
  return exceltojson;
};
