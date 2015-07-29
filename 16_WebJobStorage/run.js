

var azure = require('azure-storage');
var fs = require('fs');
var https = require('https');
var request = require('request');

console.log(process.env.BLOB_NAME);

var blobService = azure.createBlobService(process.env.BLOB_NAME, process.env.BLOB_KEY);


var ig = require('instagram-node').instagram();
ig.use({ access_token: process.env.INSTA_ACCESS_TOKEN });

ig.use({ client_id: process.env.INSTA_CLIENT_ID, client_secret: process.env.INSTA_CLIENT_SECRET });



ig.user_media_recent(process.env.INSTA_USER, function (err, medias, pagination, remaining, limit, res) {

	var len = medias.length;
	var counter = 0;

	next();

	function next() {
		var item = medias[counter];
		var file = fs.createWriteStream("placeholder.jpg");
		var imageURL = item.images.standard_resolution.url;
		var created = item.created_time;
		console.log(imageURL);
		var request = https.get(imageURL, function (response) {

			response.pipe(file);
			file.on('finish', function () {
				blobService.createBlockBlobFromLocalFile(process.env.BLOB_CONTAINER, created, 'placeholder.jpg', function (error, result, response) {
					if (!error) {
						// file uploaded
						console.log("Successful call");
						counter++;
						if (counter < len) {
							next();
						} else {
							console.log("This process is complete");
							process.exit();
						}
					} else {
						console.log("There is a problem")
					}
				});
			});

		});
	}


});












    



