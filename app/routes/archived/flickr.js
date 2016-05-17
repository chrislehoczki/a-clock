
var request = require("request");


module.exports = function (app, passport) {


	app.get("/api/flickr", function(req, res) {

		console.log(req.query)

		var key = "6d749e4901250eb5cbd1e1313747d651";
		var secret = "67fd8727a221c720";
		var tags = "tourism";
		var lat = req.query.lat;
		var long = req.query.long;
		var perPage = 10;


		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" 
		        + tags 
		        + "&api_key=" 
		        + key 
		        + "&lat=" 
		        + lat 
		        + "&lon=" 
		        + long + 
		        "&format=json&tagmode=any&per_page=" 
		        + perPage 
		        + "&json" + 
		        "&nojsoncallback=1";



		request(url, function (error, response, body) {
			
			  if (!error && response.statusCode == 200) {
			    console.log(body);
			    res.json(body);
			  }
			  else {
			  	console.log(err);
			  	res.send("Error found or no data.");
			  }
			});


			
	});


};