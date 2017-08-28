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

router.post("/add", function(req, res) {
  db.Comment.create({}).then(function(resp) {
    console.log(resp);
    return res.redirect("/");
  });
});

module.exports = router;
// module.exports = uniqueCategories;
// module.exports = getThreePosts;
