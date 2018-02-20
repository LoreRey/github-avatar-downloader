var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}
console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if(process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log("Error");
  } else {
  var parse = JSON.parse(result);
  parse.forEach(function(obj) {
  downloadImageURL(obj.avatar_url, obj.id)
});
}
// console.log("Errors:", err);
 //console.log("Result:", result);

function downloadImageURL(url, filePath) {
  request.get(url, filePath)
         .on('error', function(err) {
          throw err;
         })
         .on('response', function (response) {
         })
         .pipe(fs.createWriteStream(filePath + ".jpg"));
}
});

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
