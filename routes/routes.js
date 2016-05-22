var twitter = require('./path/twitter');
module.exports = function (app) {
	app.post('/twitter',twitter.geoSearch);
	response.send('Hello!');
};
