#!/bin/bash
# factOfTheDay
# Extract the featured contnet from Wikipedia.

# Define paths - change as needed.
_apiRoot="API"

# Store API token value.
_wikiAPIToken="REPLACE_WITHE_GENERATED_TOKEN"

if [ ! -e "$_apiRoot/logs" ]; then
 mkdir "$_apiRoot/logs"
fi

# Make backup of prior day to use if function not run.
cp "$_apiRoot/factOfTheDay-JSON.json" "$_apiRoot/_tmpfactOfTheDay-JSON.json"

# function to call Wikipedia api. Replace USER_TOKEN with your token.
_today=$(date +%Y/%m/%d)
function runWikiAPI() {
 curl -q -H "Authorization: Bearer $_wikiAPIToken" https://api.wikimedia.org/feed/v1/wikipedia/en/featured/$_today > "$_apiRoot/factOfTheDay-JSON.json"
 
 # make sure that json returned with correct property
 node "$_apiRoot"/scripts/checkJSONReturn.js "$_apiRoot"/factOfTheDay-JSON.json "tfa" > "$_apiRoot"/logs/checkJSONReturn.txt
 
 # to check if json passed or failed
 _checkedJSONReturn=$(cat "$_apiRoot"/logs/checkJSONReturn.txt)
 checkJSONReturn
}

# Retry failed api call - max will be 5.
_maxRetry=0

# Check to make sure api returned correct json.
function checkJSONReturn() {
 # using elements from runWikiAPI
 if [ "$_checkedJSONReturn" = "fail" ]; then
  _maxRetry=$(($_maxRetry+1))
  if [ "$_maxRetry" -lt 5 ]; then
   runWikiAPI
  else
   # use prior day
   mv "$_apiRoot/_tmpfactOfTheDay-JSON.json" "$_apiRoot/factOfTheDay-JSON.json"
  fi
 else
  # backup no longer needed so remove
  rm "$_apiRoot/_tmpfactOfTheDay-JSON.json"
 fi
}

# Call api and check.
runWikiAPI

# OPTIONAL - output when last run to a log file.
echo Last run: > "$_apiRoot/logs/factOfTheDay.log"
date >> "$_apiRoot/logs/factOfTheDay.log"

# Run additional blocks as needed.
