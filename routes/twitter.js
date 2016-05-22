module.exports = function(router)
{
	router.route('/users/')
		.post('/routes/twitter', function(req, res) {
		  console.log('Twitter Search Button Pressed!');
		  var Twit = require('twit');

		  var T = new Twit({
		    consumer_key:         'w66tWmtsphzxLdUJpS03cVKuE',
		    consumer_secret:      'BOJ4VxwsgJVjuhWIEQIslCRUrud83gVmEJKnGNv4xaysc1kv91',
		    access_token:         '389868811-hALJlOtoPVFm9kymPexSiEgevwtI3S6dNhDMLWmQ',
		    access_token_secret:  '31TWHRd6w8UWFEHmNMBZcCbZuU1XqqSbCoD2APMPynZVp',
		    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
		  });

		  //
		  //  search twitter for all tweets containing the word 'banana' since July 11, 2011
		  //
		  T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
		    console.log(data);
		  });
		});
}