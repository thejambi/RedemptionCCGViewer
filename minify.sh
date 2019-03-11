#!/bin/bash

previouspath=$(ls rvmin*)
echo Replacing: $previouspath

rm rvmin*.js

timestamp=$(date "+%Y%m%d-%H%M%S")
##### Following line for rvmin_TIMESTAMP.js
# filepath="rvmin_$timestamp.js"
##### Following line for rvmin.js always
filepath="rvmin.js"
echo With: $filepath

# uglifyjs js/*.js js/*/*.js -o $filepath
uglifyjs js/*.js -o $filepath

sed -i -e "s@$previouspath@$filepath@g" index.html
cp index.html test.html

echo Done
