var express = require('express');
var sequelize = require('sequelize');
var db = require('../models');

var router = express.Router();

var createUser = function() {
  db.User.create({
    username: "billybob",
    email: "farmer@farm.com",
    password: "12345"
  }).then(function(resp) {
    console.log(resp);
    createPosts();
  }).catch(function(err) {
    console.log(error);
  });
};

var createPosts = function() {
  db.Comments.create({
    body: "I'm all for it",
    links: "https://google.com"
  }).then(function(resp) {
    console.log(resp);
  }).catch(function(err) {
    console.log(err);
  });
};


router.get("/", function(req) {
  db.Posts.findAll({}).then(function(data) {
    var hdlbars = {
      posts: data
    };
    res.render('home', hdlbars);

  });
});

router.post("/add", function(req, res) {
  db.Posts.create({
    topic: "I have a question",
    category: "coding",
    description: "javascript arrgghhh",
    start: Date.now(),
    expired: Date.now(),
  }).then(function(resp) {
    console.log(resp);
  }).catch(function(err) {
    console.log(error);
  })
});


module.exports = router;
