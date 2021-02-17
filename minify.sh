#!/bin/bash
rm rvmin.js
filepath="rvmin.js"
echo Creating rvmin file: $filepath

uglifyjs js/*.js -o $filepath
# For directories in js/, can do this for example: # uglifyjs js/*.js js/*/*.js js/*/*/*.js -o $filepath

echo Done
