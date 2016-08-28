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
//?//http://blog.landspurg.net/node-js-tutorial-real-time-geolocalized-tweets/
//?//http://blog.safe.com/2014/03/twitter-stream-api-map/
//https://docs.mongodb.com/getting-started/node/client/
//http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters-in-express


var express = require('express');
var app = express();

var bodyParser = require ('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var router = express.Router();

router.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/test', function(req, res) {
  res.send("I'm on the test page!");
});

router.post('/test', function(req, res, next) {
  console.log('Posting to test');
  res.send('Hello POST! Test Success!');
  next();
});

router.post('/twitter', function(req, res, next) {
  var query = req.body.query;
  var lat = req.body.lat;
  var lng = req.body.lng;
  var rad = req.body.rad + 'km';
  console.log('Posting to Twitter');
  //console.log(req);
  console.log('Query values: ' + query + '; ' + lat + '; ' + lng + '; ' + rad);
  res.send('Hello POST! Twitter Success!');

  var Twit = require('twit');

  var T = new Twit({
    consumer_key:         'w66tWmtsphzxLdUJpS03cVKuE',
    consumer_secret:      'BOJ4VxwsgJVjuhWIEQIslCRUrud83gVmEJKnGNv4xaysc1kv91',
    access_token:         '389868811-hALJlOtoPVFm9kymPexSiEgevwtI3S6dNhDMLWmQ',
    access_token_secret:  '31TWHRd6w8UWFEHmNMBZcCbZuU1XqqSbCoD2APMPynZVp',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  });

  T.get('search/tweets', { q: query, geocode: [lat, lng, rad], language: 'en', count: 100 }, function(err, data, response) {
    console.log('Data Retrieval Start');
    console.log(data);
    console.log('Data Retrieval Complete');
  });

  /*T.get('trends/place', {id: 22722055}, function(err, data) {
    console.log(data);
  });*/

  next();
});

app.use('/', router);

app.use(express.static(__dirname +'/public'));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/Twitter_Platform.html');
});

var port = 5000;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err,db){
  assert.equal(null, err);
  console.log('Connected successfully with server.');
  db.close();
})




