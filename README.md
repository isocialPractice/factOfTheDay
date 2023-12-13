# Fact of the Day

This repository works with the `<em>ctrl + click</em>` [Wikimedia API Portal](https://api.wikimedia.org/wiki/Main_Page).
It calls the API and gets the day's featured article\(s\) from Wikipedia. The results are stored in a JSON file, and the output is an extract that day's featured article.


To see a working sample `ctrl + click` [Fact of The Day Example](https://jhauga.github.io/factOfTheDay/). 

## Instructions - <em>for instant use</em>

1. In an html document add any tag with the id attrubte set to `d="factOfTheDay"`. For example: <br>
```
<div id="factOfTheDay"></div>
```
2. Below that tag insert the below `script` tag as is: <br>
```
<script src="/js/factOfTheDay.js"></script>
```
3. Add any additional elements or styling as needed.


To use with additional functionality; copy, clone, and\/or extract this repo and make edits as needed. 
For the most part the comments within each file should provide quasi-instructions.

### DIRECTORY NOTES:

1. <strong>API</strong> - in `site root` 
   - extracts json from API call
   - NOTE - the current json file is just for example purposes.
2. <strong>bin</strong> - is `site server` 
   - a cronjob to get a daily json file
   - IMPORTANT - do not put within `site root`.
3. <strong>js</strong>  - in `site root`
   - makes an AJAX request to get extracted date from API call.


License [CC0 v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed.en).