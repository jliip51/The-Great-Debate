
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var handleBars = require('express-handlebars');
var db = require("./models");
var path = require('path');
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var cookieParser = require('cookie-parser');

var app = express();
var PORT = process.env.PORT || 3000;

//BP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + "/public"));
//validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//sessions
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.set('views', path.join(__dirname, 'views/'));
app.use(methodOverride("_method"));
app.engine("handlebars", handleBars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/controller.js");
//Home Route//
app.use('/', routes);
//Add Route//
app.use('/add', routes);
//Sign In and Sign Up routes//
app.use('/signup', routes);
app.use('/signin', routes);
//About Developers Route//
app.use('/about', routes);
//Admin Create Post Route//
app.use('/admin', routes);
//View All Available Posts Route//
app.use('/posts', routes);
//View All Posts Within Specific Category//
app.use('/posts/:category', routes);
//View Single Post Route//(For Calling single post to be reviewed and commented on)
app.use('/post/:id', routes);
//Upvote
app.use('/upvote', routes);


db.sequelize.sync().then(function() {
	app.listen(PORT, function(err) {
		if (err) throw err;
		console.log("Listening on port: " + PORT);
	});
});
