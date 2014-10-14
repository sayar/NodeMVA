var fs = require('fs');

fs.readdir('.', function (err, files) {
    if (err) {
        console.log('Error finding files: ' + err)
    } else {
        files.forEach(function (filename, fileIndex) {
            fs.readFile(filename, function (err, buf) {
                if (err) {
                    console.log('Error reading file:' + err);   
                } else {
                    console.log(buf.toString());
                }
            });
        });
    }
});
