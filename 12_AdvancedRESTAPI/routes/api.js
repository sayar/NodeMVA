var express = require('express');
var router = express.Router();

var dogs = [
  {
    "dog_id": "0",
    "dog_name": "Ginger"
  },
  {
    "dog_id": "1",
    "dog_name": "Ruby"
  },
  {
    "dog_id": "2",
    "dog_name": "Buddy"
  }
];

/* GET all dogs */
router.get('/dogs/', function(req, res, next) {
  res.json(dogs);
});

/* PUT replace all dogs */
router.put('/dogs/', function(req, res, next) {
  console.log(req.body);
  dogs = req.body;
  res.json({"STATUS": "200 OK"});
});

/* POST create a new dog */
router.post('/dogs/', function(req, res, next) {
  dogs.push(req.body)
  res.json({"STATUS": "200 OK"});
});

/* DELETE delete the entire dog collection */
router.delete('/dogs/', function(req, res, next) {
  dogs = [];
  res.json({"STATUS": "200 OK"});
});


/* GET a specific dog */
router.get('/dogs/:id', function(req, res, next) {
  var i = 0;
  var dog = null;
  for(i = 0; i != dogs.length; i++){
    if(dogs[i].dog_id == req.params.id){
      dog = dogs[i];
      break;
    }
  }
  dog !== null ? res.json(dog) : res.json({"STATUS": "404 NOT FOUND"})
});

/* PUT replace a specific dog with another dog */
router.put('/dogs/:id', function(req, res, next) {
  var i = 0;
  var dog = null;
  for(i = 0; i != dogs.length; i++){
    if(dogs[i].dog_id == req.params.id){
      dog = dogs[i];
      break;
    }
  }
  if(dog !== null){
    dog.dog_name = req.body['dog_name']
    res.json({"STATUS": "200 OK"});
  } else {
    res.json({"STATUS": "404 NOT FOUND"});
  }
});

/* DELETE a specific dog from the collection */
router.delete('/dogs/:id', function(req, res, next) {
  var i = 0;
  for(i = 0; i != dogs.length; i++){
    if(dogs[i].dog_id == req.params.id){
      dogs.splice(i, 1);
      return res.json({"STATUS": "200 OK"});
    }
  }
  return res.json({"STATUS": "404 NOT FOUND"});
});


module.exports = router;
