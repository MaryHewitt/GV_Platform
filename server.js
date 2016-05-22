//
//?//https://compositecode.com/2013/12/01/some-javascript-api-coding-with-restify-express-hacking-it-with-curl-segment-1/
//http://stackoverflow.com/questions/14338683/how-can-i-support-cors-when-using-restify




var restify = require('restify');
 
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(restify.CORS());

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

server.get('/test', function (req,res,next) {

    res.send({
        status: "ok"
    });
    return next();
}); 

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});
 
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});