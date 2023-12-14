// checkJSONReturn
// Check that a property was created in json file and ouput pass or fail.

var fs = require("fs");

// Required parameters.
var parOneCheckJSONReturn = process.argv[2]; // full path to json file being checked
var parTwoCheckJSONReturn = process.argv[3]; // property to check for

// Format file to be read as JSON and add clarity with variable naming.
var checkFile = fs.readFileSync(parOneCheckJSONReturn);
var fileJSON = JSON.parse(checkFile);
var propCheck = parTwoCheckJSONReturn;

// Turn off by default.
var checkReturn = 0;

// Recurse function.
function recurseCheckJSONReturn(cur) { 
 for (i in cur) { // check each property
  if (typeof cur[i] == "object") {  // check if object
   if (i == propCheck) {            // is this the property
    checkReturn = 1;                // it is the propery
    break;                          // check passed so end loop
   } else {       // property not found check the next one
    recurseCheckJSONReturn(cur[i]); // check the next property in iteration
   }
  } else {       // check this property
   if (i == propCheck) { // is this the property
    checkReturn = 1;     // it is the property
    break;               // check assed so end loop
   } 
  }
 }
}
// Call function  to check if property in file.
recurseCheckJSONReturn(fileJSON);

// Was the property found?
if (checkReturn == 1) {
 console.log("pass"); // output pass to terminal
} else {
 console.log("fail"); // output fail to terminal
}

// Practical use:
// > node checkJSONReturn.js "path/toFile.json" "propertyToCheck" > storeCheckedJSON.txt
// > if [ $(cat storeCheckedJSON.txt) - "pass" ]; then
// >  # some set of commands if property found
