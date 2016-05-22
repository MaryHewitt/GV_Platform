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
//http://expressjs.com/en/starter/static-files.html
//http://stackoverflow.com/questions/26079611/node-js-typeerror-path-must-be-absolute-or-specify-root-to-res-sendfile-failed
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4



var express = require('express');
var app = express();

var router = express.Router();

router.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/about', function(req, res) {
  res.send("I'm on the about page!");
});

router.post('/about', function(req, res) {
  console.log('Posting');
  res.send('Hello post!');
  next();
});

app.use('/', router);

app.use(express.static(__dirname +'/public'));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/Twitter_Platform.html');
});

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

/*var allowCrossDomain = function(req, response, next) {
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
});*/

console.log('Server is running!');

var port = 5000;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});




