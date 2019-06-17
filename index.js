const fs = require('fs');
const { pipeline } = require('stream');
const csv = require('fast-csv');
const orderBy = require('lodash.orderby');

module.exports = async () => {
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
  });

  const promises = [];
  const hash = {};

  // parse all csv into Keyword and Volume array
  filePaths.forEach((path) => {
    promises.push(new Promise((resolve, reject) => {
      fs.createReadStream(path, { encoding: 'utf16le' })
          .pipe(csv.parse({
          headers: true,
          delimiter: '\t',
        }))
        .on('data', (row) => {
          hash[row.Keyword] = row.Volume;
        })
        .on('error', (errorString) => {
          console.error(`${path} is not valid csv file.\nError: ${errorString}`);
          reject(`${path} is not valid csv file.\nError: ${errorString}`);
          process.exit();
        })
        .on('end', () => {
          resolve(`Complete handling ${path}`);
        })
      })
    );
  })

  await Promise.all(promises);

  // sort
  const keywordsArray = Object.keys(hash).map(keyword => ({
    keyword,
    volume: Number(hash[keyword]),
  }));

  console.log(orderBy(keywordsArray, 'volume', 'desc'));
}
