var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.listen(process.env.PORT || 8080);
