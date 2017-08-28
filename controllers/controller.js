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

//Iterates through dbresult for posts to get unique category values to display in the dropdown//
var uniqueCategories = function(dbresult, obj, cb) {
  var allCatArr = [];
  var hbsObj = obj;
  for (var i = 0; i < dbresult.length; i++) {
    allCatArr.push(dbresult[i].category);
  }
  var unqArr = [];
  for (var i = 0; i < allCatArr.length; i++)
    if (unqArr.indexOf(allCatArr[i]) === -1 && allCatArr[i] !== '')
      unqArr.push(allCatArr[i]);
  hbsObj.categories = unqArr;
  return cb(hbsObj);
}
//Iterates through posts dbresults to get 3 results//
var getThreePosts = function(dbresult, cb) {
  console.log(dbresult)
  var postArr = [];
  for (i = 0; i < 3; i++) {
    postArr.push(dbresult[i]);
  }
  var obj = {
    post: postArr
  }
  console.log(obj);
  uniqueCategories(dbresult, obj, function(hbsObj){
    return cb(hbsObj);
  });
};

router.get("/", function(req, res) {
  db.Posts.findAll({}).then(function(dbresult) {
    getThreePosts(dbresult, function(hbsObj){
    console.log(hbsObj);
    res.render("home", hbsObj);
  })
});
});

router.get("/about", function(req, res) {
  res.render("aboutdevelopers");
});

router.get("/post/:id", function(req, res) {
  db.Posts.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(hbsObj) {
    console.log(hbsObj);
    res.render("comment-submit", hbsObj);
  });
});

router.post("/add", function(req, res) {
  db.Comment.create({}).then(function(resp) {
    console.log(resp);
    return res.redirect("/");
  });
});

module.exports = router;
// module.exports = uniqueCategories;
// module.exports = getThreePosts;
