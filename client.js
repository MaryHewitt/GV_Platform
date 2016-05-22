var assert = require('assert');
var restify = require('restify');
 
var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '~1.0'
});
 
client.post('/echo/mark', function (err, req, res, obj) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  assert.ifError(err);
  console.log('Server returned: %j', obj);
});