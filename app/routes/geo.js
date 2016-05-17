module.exports = function (app, passport) {


	app.get("/api/geocode", function(req, res) {
	console.log(req.params);

			 //GEOCODING
	var geocoderProvider = 'google';
	var httpAdapter = 'http';
	var httpsAdapter = "https"
	var key = process.env.GOOGLE_KEY;
	// optionnal 
	var extra = {
	    apiKey: key, // for Mapquest, OpenCage, Google Premier 
	    formatter: null         // 'gpx', 'string', ... 
	};
	 
	var geocoder = require('node-geocoder')(geocoderProvider, httpsAdapter, extra);

	var location = {
	}

	var loc = req.query.city;

	geocoder.geocode(loc, function(err, response) { 
		console.log(response)
		location.city = response[0].city;
		location.neighborhood = response[0].neighborhood;
		location.country = response[0].country;
		location.countryCode = response[0].countryCode;
		location.latitude = response[0].latitude;
		location.longitude = response[0].longitude;
		res.send(location)
	});

		
	});


};