
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var handleBars = require('express-handlebars');
var db = require("./models");
var path = require('path');


var app = express();
var PORT = process.env.PORT || 8080;


app.use(express.static(__dirname + "/public"));
//BP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.set('views', path.join(__dirname, 'views/'));
app.use(methodOverride("_method"));
app.engine("handlebars", handleBars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");


// var routes = require("./controllers");
// app.use('/', routes);


db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function(err) {
		if (err) throw err;
		console.log("Listening on port: " + PORT);
	});
});
