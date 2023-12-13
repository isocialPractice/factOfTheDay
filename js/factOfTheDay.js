// factOfTheDay
// Extract the API result from factOfTheDaye.php call
//////////////////////////////////////////////////////////////////////////////////////

 // Target the html element where content will go. 
 var factOfTheDay = document.getElementById("factOfTheDay");
 
 // Function call to get data extracted from api call, and then extract snippets to output.
 async function getfactOfTheDay() {
  let wikiPromise = new Promise(
   function(yes, no) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/API/factOfTheDay.php");
    xmlhttp.onload = function() {
     if (xmlhttp.status == 200) {
      yes(xmlhttp.response);
     } else {
      yes("load error");
     }
    };
    xmlhttp.send();
   }
  );
  factOfTheDay.innerHTML = await wikiPromise;
 }
 // Call function.
 getfactOfTheDay();