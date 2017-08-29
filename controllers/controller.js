var express = require('express');
var sequelize = require('sequelize');
var db = require('../models');
var passport = require("./passport/passport");
var isAuthenticated = require("./passport/middleware/isAuthenticated");
var alltopics = require("../views/alltopics");
var router = express.Router();

router.post("/signin", passport.authenticate("local"), function(req, res) {

  res.render("alltopics");
});

router.post("/signup", function(req, res) {
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  console.log(username,email,password);
  req.checkBody('username', 'Name is required').notEmpty();
  var errors=req.validationErrors();
  if(errors){
    req.flash('error', '');

  }
  console.log("siddddddddd")
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
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
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
  uniqueCategories(dbresult, obj, function(hbsObj) {
    return cb(hbsObj);
  });
};
//Call all posts and filter three for home page============//
router.get("/", function(req, res) {
  db.Posts.findAll({}).then(function(dbresult) {
    getThreePosts(dbresult, function(hbsObj) {
      console.log(hbsObj);
      res.render("home", hbsObj);
    })
  });
});
//Render about developers page===================//
router.get("/about", function(req, res) {
  res.render("aboutdevelopers");
});
//Get One Post By ID, display it on comment page===========//
router.get("/post/:id", function(req, res) {
  db.Posts.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: db.Comments, include: [{ model: db.Users}]}]
  }).then(function(data) {
    // var hbsObj = {
    //   Posts: data
    // };
    // res.render("comment-submit", hbsObj);
  }).catch(function(err){
    throw err;
  });
});
//Display all posts regardless of category and display them on all topics page==========//
router.get("/posts", function(req, res) {
  db.Posts.findAll({})
    .then(function(data) {
      var hbsObj = {
        Posts: data
      };
      res.render("alltopics", hbsObj);
    }).catch(function(err) {
      throw err;
    });
});

router.get("posts/:category")

router.post("/add", function(req, res) {
  db.Comments.create(req.body).then(function(resp) {
    console.log("/post/"+resp.PostId)
    return res.redirect("/post/" + resp.PostId);
  }).catch(function(err){
    throw err;
  });
});

// router.post('/login',
//   passport.authenticate('local', {successRedirect:'/', failureRedirect:'/about',failureFlash: true}),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;
