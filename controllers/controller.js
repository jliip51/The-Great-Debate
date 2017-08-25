var express = require('express');
var sequelize = require('sequelize');
var db = require('../models');

var router = express.Router();

var createUser = function() {
  db.User.create({
    username: "billybob",
    email: "farmer@farm.com",
    password: "12345"
  }).then(function(resp){
    console.log(resp);
    createPosts();
  }).catch(function(err){
    console.log(error);
  });
};

var createPosts = function() {
  db.Posts.create({
    headline: "Hot Topic",
    position: true,
    body: "I'm all for it",
    links: "https://google.com"
  }).then(function(resp){
    console.log(resp);
  }).catch(function(err){
    console.log(err);
  });
};


router.get("/", function(req, res) {
  db.Topics.findAll({
  }).then(function(data) {
    console.log(data);
  });
});

router.post("/add", function(req) {
    db.Topics.create({
      question: "I have a question",
      category: "coding",
      start: DATE,
      expired: DATE,
    }).then(function(resp) {
      console.log(resp);
      createUser();
    }).catch(function(err){
      console.log(error);
    })
  });


module.exports = router;
