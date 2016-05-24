


module.exports = function (query) {

		var request = require("request");
		var Q = require("q");

		var deferred = Q.defer();
		//THIS WILL LAST UNTIL 06/07/2016
		var token = process.env.FACEBOOK_TOKEN;

		//THIS THIS WILL LAST FOREVER?

		var query = encodeURIComponent(query);

		var url = 'https://graph.facebook.com/search?q=' + query + '&limit=10&type=group&access_token=' + token;

		console.log(url)

		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    deferred.resolve(response.body);

		  }
		  else {
		  	deferred.reject(error)
		  }
		});

		return deferred.promise;


};