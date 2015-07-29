var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('places', { title: 'Places I Plan on Visiting',hasPlaces:true,
    places:{1:{name:"Japan",url:"http://en.wikipedia.org/wiki/Japan"},
            2:{name:"Scotland",url:"http://en.wikipedia.org/wiki/Scotland"},
            3:{name:"Brazil",url:"http://en.wikipedia.org/wiki/Brazil"}}});
});

module.exports = router;
