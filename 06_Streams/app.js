var fs = require("fs");

// Read File
fs.createReadStream("package.json")
    // Write File
    .pipe(fs.createWriteStream("out-package.json"));
