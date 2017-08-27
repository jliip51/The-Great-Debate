var express = require('express');
var sequelize = require('sequelize');
var db = require('../models');

var router = express.Router();

router.post("/signup", function(req, res) {
  console.log(req.body);
  db.Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(function(dbresult) {
    res.json(dbresult);
  });
});

router.get("/signin", function(req, res) {
  console.log("this is also working");
  console.log(req.query.email)
  db.Users.findOne({
    where: {
      email: req.query.email,
      password: req.query.password
    }
  }).then(function(dbresult) {
    res.json(dbresult);
    console.log(dbresult);
  });
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

router.post("/add", function(req, res) {
    db.Comment.create({
    }).then(function(resp) {
      console.log(resp);
    return res.redirect("/");
  });
});

module.exports = router;
