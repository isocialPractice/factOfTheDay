<?php
// factOfTheDay
// Get today's featured content from English Wikipedia
//////////////////////////////////////////////////////////////////////////////////////

 // Define file - content extracted once daily via cronjob.
 $output = file_get_contents("factOfTheDay-JSON.json"); // if using from repo
 $result = json_decode($output, true); 
 
 // Travers json and get content. 
 function getFeaturedArticle() {
  global $output, $result, $pageID, $pageTitle, $extract_html;

// START PROCESS - extract featured article section
  $pageID = $result["tfa"]["pageid"];
  $pageTitle = $result["tfa"]["title"];
  // travers to get extract_html property
  foreach ($result["tfa"] as $k => $v ) {
   if ($k == "extract_html") { $extract_html .= $v; }
  }
 }
 getFeaturedArticle(); 
 
 // Check if info was returned.
 function outputFeaturedArticle() {
  global $error_out, $extract_html;
  
  // check that main elments were returned
  if ($extract_html == null) {
   $error_out = 1;
  } else {
   $error_out = 0;   
  }
 }
  outputFeaturedArticle();

 if ($error_out == 1) {
  echo "Uh-oh - something went wrong.";  
 } else {                // Output first paragraph of featured article.    
  echo $extract_html .   // Using str_replace() to clean extracted value.
  "   
  More at <a href='https://en.wikipedia.org/?curid=$pageID' target='_blank' rel='external'>" . 
  str_replace("_", " ", $pageTitle) . 
  "</a> Wikipedia page. ";
 }
 
?>
