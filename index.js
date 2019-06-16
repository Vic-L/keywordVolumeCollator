#!/usr/bin/env node
const fs = require('fs');

const filePaths = process.argv.splice(2);

// check against empty argument
if (filePaths.length === 0) {
  console.log("No arguments given: List down the paths of your csv files in the following format:\nkvc /path/to.file1 /path/to.file2");
  process.exit();
}

// check that filepath exist
filePaths.forEach(function (path) {
  console.log(`Checking if file exist: ${path}`);
  if(fs.existsSync(path)) {
    console.log("file exists");
  } else {
    console.error(`File does not exist: ${path}`);
    process.exit();
  }
})

console.log(filePaths);