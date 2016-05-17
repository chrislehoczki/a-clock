

var request = require('request');
var fs = require("fs");
var bodyParser  = require('body-parser');

var EventEmitter = require('events').EventEmitter;
var stravaListener = new EventEmitter();









var segments = [];
var athletes = [];
var athleteCount = 0;

var location = {};

module.exports = function (app, passport) {


	app.post("/api/strava", function(req, res) {
		location = req.body;
		strava.getSegments("segments/explore", createBoundary(location.latitude, location.longitude), "running");
		
		stravaListener.on('athletes', function() {
  		 res.send(JSON.stringify(location));
    		
		});
	});


};

var count = 0;
var strava = {

	token: "00a1c0f94967c1bc466773c42fbdfd9844c7597a",

	//GET POPULAR SEGMENTS

	getSegments: function(endpoint, bounds, activityType) {

	var obj = this;
	endpoint += "?bounds=" + bounds + "&activity_type=" + activityType;
	request.get({
	  headers: {
				    'Authorization': "Bearer " + obj.token
				  },
	  url:     'https://www.strava.com/api/v3/' + endpoint
	}, function(error, response, body){
	  body = JSON.parse(body);
	  //SAVE THE SEGMENT IDS FOR USE
	  return obj.saveSegments(body);

	});

},


//FOR EACH SEGMENT - GET DATA
  	saveSegments: function(data) {
	//console.log(data)
	data.segments.forEach(function(segment) {
		segments.push(segment.id);
	});

	for (var i =0; i < 5; i++) {
		this.getSingleSegment("segments/" + segments[i].toString() + "/leaderboard")
	}

},

	
	getSingleSegment: function(endpoint) {

	request.get({
	  headers: {
				    'Authorization': "Bearer " + strava.token
				  },
	  url:     'https://www.strava.com/api/v3/' + endpoint
	}, function(error, response, body){
	  //console.log(body);
	  body = JSON.parse(body);
	  athleteCount += body.entry_count;

  
	  //FOR EACH SEGMENT - PUSH ATHLETES TO ARRAY
	  body.entries.forEach(function(athlete) {

	  	var athleteObj = {
	  		id: athlete.athlete_id,
	  		name: athlete.athlete_name,
	  		pic: athlete.athlete_profile
	  	};

  	athletes.push(athleteObj)

  });

	count+=1;
  	 console.log(count)
	 if (count ===5) {
	 	console.log("on the fifth")
	 	//ADD DATA TO CITY OBJECT
  	location.athleteCount = athleteCount;
  	location.athletes = athletes;

  	//SAVE DATA AS JSON
  	stravaListener.emit('athletes');
  	//fs.writeFile("segments.json", prettyString(location));

	 }

  	

});


}



}


//GET DATA FOR A SINGLE SEGMENT



function createBoundary(lat, long) {

	var x1 = lat - 0.05;
	var x2 = lat + 0.05;
	var y1 = long - 0.05;
	var y2 = long + 0.05;

	var boundary = x1.toFixed(3).toString() + "," + y1.toFixed(3).toString() + "," + x2.toFixed(3).toString() + "," + y2.toFixed(3).toString();
	console.log(boundary)
	return boundary;
}


function prettyString(json) {
	return JSON.stringify(json, null, 4);
}