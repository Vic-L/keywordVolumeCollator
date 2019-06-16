const fs = require('fs');

module.exports = () => {
  const filePaths = process.argv.splice(2);

  // check against empty argument
  if (filePaths.length === 0) {
    console.log("No arguments given: List down the paths of your csv files in the following format:\nkvc /path/to.file1 /path/to.file2");
    process.exit();
  }

  // check that filepath exist
  filePaths.forEach(function (path) {
    if(fs.existsSync(path)) {
      console.log(`File exists: ${path}`);
    } else {
      console.error(`File does not exist: ${path}`);
      process.exit();
    }
  })

  console.log(filePaths);
}
