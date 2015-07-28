var request = require("request");
 
request("http://www.bing.com", function(error, response, body) {
  console.log(body);
});
