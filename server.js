var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require('./routes/apiRoutes')(app);

app.listen(PORT, function(err){
  if(err) throw err;
  console.log(`App connected on PORT: ${PORT}`);
})
