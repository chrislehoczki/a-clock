module.exports = function (app, passport) {


	app.get("/api/fbookgroups", function(req, res) {
		var request = require("request");

		//THIS WILL LAST UNTIL 06/07/2016
		var token = "EAALNwZAbsZAlABAJPzQGAILzED0iN5gYRTEqimaqZA0ZCfX6JZBZBJyeHt8e7tpZCtZCvF0k5vT7jS9UeF9Yd3HIHZC2oj7HhSLdiakbDqIId6aYEHbjqPpQmLubyI4O8hlq5g2rzbcXzyIgIGgAwmWjk4rPTAXtXBW0ZD"

		//THIS THIS WILL LAST FOREVER?

		
		var query = encodeURIComponent(req.query.query);

		

		var url = 'https://graph.facebook.com/search?q=' + query + '&limit=10&type=group&access_token=' + token;

		console.log(url)

		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    res.send(body)
		  }
		  else {
		  	res.send(error)
		  }
		});

	});


};