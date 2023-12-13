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

# function to call Wikipedia api. Replace USER_TOKEN with your token.
_today=$(date +%Y/%m/%d)
function runWikiAPI() {
 curl -q -H "Authorization: Bearer $_wikiAPIToken" https://api.wikimedia.org/feed/v1/wikipedia/en/featured/$_today > "$_apiRoot/factOfTheDay-JSON.json"
 
 # make sure that json returned correctly
 node "$_apiRoot"/scripts/checkJSONReturn.js "$_apiRoot"/factOfTheDay-JSON.json "onthisday" > "$_apiRoot"/logs/checkJSONReturn.txt
 
 # to check if json passed or failed
 _checkedJSONReturn=$(cat "$_apiRoot"/logs/checkJSONReturn.txt)
 checkJSONReturn
}

# Check to make sure api returned correct json.
function checkJSONReturn() {
 # using elements from runWikiAPI
 if [ "$_checkedJSONReturn" = "fail" ]; then
  runWikiAPI
 fi
}

# Call api and check.
runWikiAPI

# OPTIONAL - output when last run to a log file.
echo Last run: > "$_apiRoot/logs/factOfTheDay.log"
date >> "$_apiRoot/logs/factOfTheDay.log"

# Run additional blocks as needed.
