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
    //xmlhttp.open("GET", "/API/factOfTheDay.php"); // if using from repo.
    xmlhttp.open("GET", "API/factOfTheDay-JSON.json");
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
  return await wikiPromise;
 }
 // Call function and get output..
 var output, result, pageID, pageTitle, extract_html,
     error_out, extract_html;
 getfactOfTheDay().then(function(outText) {
  // convert output to json
  result = JSON.parse(outText); 
 
  // Travers json and get content.   
  extract_html = "";
  let getFeaturedArticle = function() { // START PROCESS - extract featured article section
   pageID = result["tfa"]["pageid"];
   pageTitle = result["tfa"]["title"];
   // travers to get extract_html property
   for (i in result["tfa"]) {
    if (i == "extract_html") { 
     extract_html += result["tfa"][i]; 
    }
   }       
  };
  getFeaturedArticle(); 
 
  // Check if info was returned.
  let outputFeaturedArticle = function() {    
   // check that main elments were returned
   if (extract_html == undefined) {
    error_out = 1;
   } else {
    error_out = 0;   
   }
  };
  outputFeaturedArticle();
  
  // check to make sure output ok
  if (error_out == 1) {
   factOfTheDay.innerHTML = "Uh-oh - something went wrong.";  
  } else {                // Output first paragraph of featured article.    
  factOfTheDay.innerHTML = extract_html +
   " More at <a href='https://en.wikipedia.org/?curid=" + pageID + 
   "' target='_blank' rel='external'>" + 
   pageTitle.replace(/_/g, " ") +  // Using str_replace() to clean extracted value.
   "</a> Wikipedia page. ";
  }
 });
 
 