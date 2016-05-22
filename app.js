//Referenced from:
//?//http://www.informit.com/articles/article.aspx?p=1947699&seqNum=3
//?//http://stackoverflow.com/questions/6377844/node-js-twitter-client
//?//https://nodejs.org/api/synopsis.html
//https://github.com/ttezel/twit
//http://nodeguide.com/beginner.html
//http://expressjs.com/en/starter/installing.html
//http://enable-cors.org/server_expressjs.html
//http://stackoverflow.com/questions/28516951/calling-method-in-node-js-from-browser-using-express
//http://stackoverflow.com/questions/21317981/cannot-get-nodejs-error
//http://stackoverflow.com/questions/29986571/cannot-get-when-trying-to-connect-to-localhost8080-in-node-js

var express = require('express');
var app = express();

var router = express.Router();
require("./routes/twitter")(router);
app.use("./api",router);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  res.send("Hello world");
});

var allowCrossDomain = function(req, response, next) {
  response.header('Access-Control-Allow-Origin', "http://localhost");
  response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');

  if ('OPTIONS' == req.method) {
    response.send(200);
  }
  else {
    next();
  }
};

app.configure(function() {
    app.use(allowCrossDomain);
  //Parses the JSON object given in the body request
    app.use(express.bodyParser());
});

app.get('/routes/twitter', function(req, res) {
  console.log('Twitter Search Button Pressed!');
});

console.log('Server is running!');

var port = 5000;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});




