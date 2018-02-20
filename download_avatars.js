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

getRepoContributors("jquery", "jquery", function(err, result) {
  var parse = JSON.parse(result);
  parse.forEach(function(obj) {
  downloadImageURL(obj.avatar_url, obj.id)
});
// console.log("Errors:", err);
 //console.log("Result:", result);

function downloadImageURL(url, filePath) {
  request.get(url, filePath)
         .on('error', function(err) {
          throw err;
         })
         .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response content-type: ', response.headers['content-type']);
         })
         .pipe(fs.createWriteStream(filePath + ".jpg"));
}
});

