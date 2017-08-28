var express = require('express');
var sequelize = require('sequelize');
var db = require('../models');
var passport = require("./passport/passport");
var isAuthenticated = require("./passport/middleware/isAuthenticated");
var alltopics=require("../views/alltopics");
var router = express.Router();

router.post("/signin", passport.authenticate("local"), function(req, res) {
console.log("this is also working");
console.log("siddddddd");
console.log("siddddddd");
res.render("alltopics");
});


router.post("/signup", function(req, res) {
  console.log(req.body);
  console.log("siddddddd");
  db.Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function(dbresult) {
    res.render("home");
  });
});

router.get("/user_data", isAuthenticated, function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

var getThreePosts = function(dbresult) {
  var ary = [];
  var hbsObject = {}
  for (i = 0; i < 3; i++) {
    ary.push(dbresult[i]);
  }
  return hbsObject = {
    post: ary
  }
};


router.get("/", function(req, res) {
  db.Posts.findAll({
  }).then(function(dbresult) {
    // getThreePosts(dbresult)
    var hbsObject = {
      post: dbresult
    };
    res.render("home", hbsObject);
  });
});

router.get("/about", function(req, res) {
    res.render("aboutdevelopers");
});

router.post("/add", function(req, res) {
    db.Comment.create({
    }).then(function(resp) {
      console.log(resp);
    return res.redirect("/");
  });
});

module.exports = router;
