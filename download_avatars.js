var request = require('request');
var secrets = require('./secrets.js');

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
  console.log("Result:" + obj.avatar_url)
});
// console.log("Errors:", err);
 //console.log("Result:", result);
});

