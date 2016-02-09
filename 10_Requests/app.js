var request = require("request");
var fs = require("fs");
//Example 1 : Let's grab a page 
request("http://www.bing.com", function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Bing homepage.
  }

});

//Example 2 : Simple Download of a file , kinda with no callback
/*
request('http://i.ytimg.com/vi/HrnBrOytj-A/0.jpg').pipe(fs.createWriteStream('rami.jpg'));
*/

/*
// Example 3: We can download a file, and capture when its done withe finish event
var file = fs.createWriteStream('rami.jpg');
request('http://i.ytimg.com/vi/HrnBrOytj-A/0.jpg').pipe(file);
file.on('finish',function(){
  console.log("Okay, we got this stellar pic of Rami");
})

*/

