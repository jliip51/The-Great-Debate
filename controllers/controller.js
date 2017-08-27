var express = require('express');
var sequelize = require('sequelize');
var db = require('../models');

var router = express.Router();


router.get("/", function(req, res) {
  db.Posts.findAll({
  }).then(function(data) {
    var hbsObject = {
      post: data
    };
    res.render("home", hbsObject);
  });
});

// router.post("/add", function(req, res) {
//     db.Comment.create({
//     }).then(function(resp) {
//       console.log(resp);
//     return res.redirect("/");
//   });
// });

module.exports = router;
