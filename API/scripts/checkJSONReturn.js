// checkJSONReturn
// Check that a property was created in json file and ouput pass or fail.

var fs = require("fs");
var parOneCheckJSONReturn = process.argv[2];
var parTwoCheckJSONReturn = process.argv[3];

var checkFile = fs.readFileSync(parOneCheckJSONReturn);
var fileJSON = JSON.parse(checkFile);
var propCheck = parTwoCheckJSONReturn;

var checkReturn = 0;

function recurseCheckJSONReturn(cur) { 
 for (i in cur) {
  if (typeof cur[i] == "object") {
   if (i == propCheck) {
    checkReturn = 1;
    break;
   } else {  
    recurseCheckJSONReturn(cur[i]);     
   }
  } else {
   if (i == propCheck) {
    checkReturn = 1;
    break;
   } 
  }
 }
}
recurseCheckJSONReturn(fileJSON);
if (checkReturn == 1) {
 console.log("pass");
} else {
 console.log("fail");
}