#!/usr/bin/env node
const filePaths = process.argv.splice(2)
// check against empty argument
if (filePaths.length === 0) {
  console.log("No arguments given: List down the paths of your csv files in the following format:\nkvc /path/to.file1 /path/to.file2");
  process.exit();
}
console.log(filePaths);