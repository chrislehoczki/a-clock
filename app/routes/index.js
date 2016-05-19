'use strict';


var path = process.cwd();
//var bodyParser   = require('body-parser');
var Q = require("q")

var passport = require('passport');

var DAO = require("../controllers/DAO.js")

//API FUNCTIONS

var fbook = require("./apis/fbookgroups.js");
var flickr = require("./apis/flickr.js");
var fourSquare = require("./apis/foursquare.js");
var locate = require("./apis/ipLocate.js");
var skyscan = require("./apis/skyscanner.js");
var geo = require("./apis/geo.js");
var Strava = require("./apis/Strava.js");
var Weather = require("./apis/Weather.js")

//REACT
var React = require('react');
var ReactDOM = require("react-dom")
var ReactDOMServer = require("react-dom/server")
var ReactBootstrap = require("react-bootstrap")

//USER SCHEMA	
var Users = require('../models/users.js');

//CITIES SCHEMA

var Cities = require('../models/cities.js');
//DATA ACCESS OBJECT
var DAO = new DAO();

module.exports = function (app, passport) {


// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/login');
	}

	var fbookScope = [
		"public_profile",
		"email"
	]

	//FBOOK LOGIN
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: fbookScope }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));


	//LOCAL
   

    app.post('/signup', 
    	passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //STRAVA

    app.get('/auth/strava',
 		 passport.authenticate('strava'/*, { scope: ['write'] }*/));

	app.get('/auth/strava/callback', 
  	passport.authenticate('strava', { failureRedirect: '/login' }),
  		function(req, res) {
  			
    // Successful authentication, redirect home.
    	res.redirect('/');
  	});



	//API////////////////
	app.route('/login')
		.get(function (req, res) {

			res.render('login', { /*signupMessage: req.flash("signupMessage"), loginMessage: req.flash("loginMessage") */}); 
		});

	app.route('/')
		.get(/*isLoggedIn,*/ function (req, res) {

			//CREATE MARKUP
			//RENDER PAGE WITH MARKUP AND PROP
           
            var query = {};
			query.query = {};
			query.projection = {"running.segments": 0, "riding.segments": 0, "running.runners": 0, "riding.riders": 0};
			query.sort = { "riding.riderCount" : "desc"}
			query.limit = +req.query.limit || 20;

			DAO.getAllCities(query).then(function(data) {

				//WORK WITH DATA

				data = JSON.stringify(data);
				data = JSON.parse(data);

				//CREATE FACTORIES

				var Main = React.createFactory(require("../components/Main.js"));
				var Sidebar = React.createFactory(require("../components/Sidebar.js"))
				var Header = React.createFactory(require("../components/Header.js"))

				//IF HERE IS USER - USE USER HEADER
				var user = "none";
				if (req.user) {
					Header = React.createFactory(require("../components/UserHeader.js"))
					user = req.user;
				}
				
				var main = ReactDOMServer.renderToString(Main({data: data}));
				var sidebar = ReactDOMServer.renderToString(Sidebar({data: data}));
				var header = ReactDOMServer.renderToString(Header({data: data, type: "front"}));



				res.render("index", {main: main, sidebar: sidebar, header: header, pageType: "front", data: JSON.stringify(data), user: JSON.stringify(user)});
				}).catch(function(err) {
					console.log("got an error server side rendering components " + err);
				});

			});


	app.route('/city/:slug')
		.get(/*isLoggedIn,*/ function (req, res) {

			//CREATE MARKUP
			//RENDER PAGE WITH MARKUP AND PROP
        var slug = req.params.slug;

		var query = {};
		query.query = {"info.city.slug": slug};
		query.projection = {};
		query.sort = {}
		query.limit = {};


		DAO.getSingleCity(query).then(function(data) {
			
				data = JSON.stringify(data);
				data = JSON.parse(data);
			
				var Single = React.createFactory(require("../components/Single.js"));
				var Sidebar = React.createFactory(require("../components/Sidebar.js"))
				var Header = React.createFactory(require("../components/Header.js"))
				

				//IF HERE IS USER - USE USER HEADER
				var user = "none";
				if (req.user) {
					Header = React.createFactory(require("../components/UserHeader.js"))
					user = req.user;
				}

				var single = ReactDOMServer.renderToString(Single({data: data}));
				var sidebar = ReactDOMServer.renderToString(Sidebar({data: data}));
				var header = ReactDOMServer.renderToString(Header({data: data, type: "single"}));

				res.render("single", {main: single, sidebar: sidebar, header: header, pageType: "single", data: JSON.stringify(data), user: JSON.stringify(user)});
				}).catch(function(err) {
					console.log("got an error server side rendering components " + err);
				});

		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});


	//DATA ROUTES

	app.get("/api/hotelcost", function(req, res) {

		DAO.getHotelValues().then(function(data) {
			res.send(data)
		}).catch(function(err) {
			console.log(err)
		})

	});

	app.get("/api/totals", function(req, res) {

		DAO.getTotals().then(function(data) {

			var dataObj = {
				running: data[0],
				riding: data[1],
				elevation: data[2],
				cost: data[3]
			}

			res.send(dataObj)
		}).catch(function(err) {
			res.send(err)
			console.log(err)
		});


	})

	app.get("/api/citynames", function(req, res) {

		DAO.getCityNames().then(function(data) {

			res.send(data)
		}).catch(function(err) {
			res.send(err)
			console.log(err)
		});

	});

   
	app.get("/api/cities", function(req, res) {

		//DECLARE QUERY
		var query = {};

		//QUERY
		
		query.query = {};


		//HOTEL COST
		var minHotelCost = req.query.minHotelCost;
		var maxHotelCost = req.query.maxHotelCost;
		query.query["cost.hotel.USD"] =  { $gt: +minHotelCost, $lt: +maxHotelCost}

		//TEMP
		if (req.query.temp) {
			var month = req.query.month;
			var tempQueryString = "weather.data." + month + ".avgTemp"
			query.query[tempQueryString] =  {$gt: +req.query.temp.min, $lt: +req.query.temp.max}
		}

		//TEMP
		if (req.query.rain) {
			var month = req.query.month;
			var rainQueryString = "weather.data." + month + ".wetDays"
			query.query[rainQueryString] =  {$lte: +req.query.rain}
		}
		

		//TERRAIN 
		if (req.query.terrain) {
			var terrainQuery = req.query.terrain;
			var elevationSeparator = 500;

			query.query["riding.elevation"] = {$lt : elevationSeparator};
			if (terrainQuery === "hilly") {
				query.query["riding.elevation"] = {$gt : elevationSeparator};
			}

		}

		//ALTITUDE 
		if (req.query.alt) {
			var altQuery = req.query.alt;
			var altString = "weather.elevation"

			query.query[altString] = {$gt: +altQuery.min, $lt: +altQuery.max}
		}
		
		//CONTINENT 

		if (req.query.continent) {
			var continent = req.query.continent;
			query.query["info.region.slug"] = continent;
		}
		
		//PROJECTION
		query.projection = {"running.segments": 0, "riding.segments": 0, "running.runners": 0, "riding.riders": 0};

		//SORT 
		if (req.query.sortBy) {
			var sortField = req.query.sortBy;	
			query.sort = {};
			query.sort[sortField] = -1;	

		}
		

		

		//LIMIT 

		query.limit = +req.query.limit || 20;


		DAO.getAllCities(query).then(function(data) {
			res.send(data);
		}).catch(function(err) {
			console.log("got an error server side api/cities " + err);
		});

	});

	app.get("/api/city", function(req, res) {

		var slug = req.query.slug;
		var query = {};
		query.query = {"info.city.slug": slug};
		query.projection = {};
		query.sort = {}
		query.limit = {};

		DAO.getSingleCity(query).then(function(data) {
			res.send(data)
		});

	});

	//REST API 

	app.route("/api/tips")
		.get(function(req, res) {
			var slug = req.query.slug;
			

			DAO.getTips(slug).then(function(data) {

				res.send(data)
			}).catch(function(error) {
				console.log(error)
			});

		})
		.post(function(req, res) {
			var slug = req.body.slug;
			var tip = req.body.tip;
			var activity = req.body.activity;
			var user = "development user";
			DAO.addTip(user, activity, slug, tip)

			res.send("post tips working")
		});

	app.route("/api/description")
		.get(function(req, res) {

			var slug = req.query.slug;

			DAO.getDescription(slug).then(function(data) {
				res.send(data)
			});


		})
		.post(function(req, res) {

			var description = req.body.description;
			var slug = req.body.slug;
			var user = "development user";

			DAO.addDescription(slug, description, user);

			res.send("Description updated!")
		});

	//API ROUTES

	//IP LOCATE
	app.get("/api/locateuser", function(req, res) {
		locate(req).then(function(data) {
			res.send(data)
		});
		
	});

	//FBOOK
	app.get("/api/fbookgroups", function(req, res) {
		fbook(req.query.query).then(function(data) {
			res.send(data);
		}).catch(function(err) {
			console.log(err)
			res.send(err);
		});
	});

	//FLICKR
	app.get("/api/flickr", function(req, res) { 
		
		flickr(req.query.lat, req.query.long, req.query.city, req.query.country).then(function(img) {
			res.send(img);
		}).catch(function(error) {
			console.log(error);
			res.send(error);
		})
		
	});

	//4SQ
    app.get("/api/foursquare", function(req, res) {

    	fourSquare(req.query.lat, req.query.long).then(function(data) {
    		res.send(data);
    	}).catch(function(err) {
    		console.log(err)
    		res.send(err);
    	})

    });

    //SKYSCAN
    app.get("/api/skyscan", function(req, res) {
    	var destination = req.query.destination;
    	skyscan("Manchester", destination, "TH", "GBP", "en_US", "2016-05-11").then(function(data) {
    		console.log(data)
			res.send(data)
		})
    });

    //GOOGLE GEOCODE
    app.get("/api/geocode", function(req, res) {

    	geo(req.query.city).then(function(data) {
    		res.send(data)
    	}).catch(function(err) {
    		res.send(err)
    	})


    });


    //STRAVA SEGMENTS

    app.post("/api/getsegs", function(req, res) {

    	console.log(req.body)
    	var city = {}
    	
    	city.info = {};
    	city.info.country = {};
    	city.info.city = {};
    	city.info.location = {};

    	city.info.city.name = req.body.city;
    	city.info.country.name = req.body.country;
    	city.info.location.latitude = +req.body.lat;
    	city.info.location.longitude = +req.body.long;

    	city.datasets = {};

    	console.log(city)
    	
    	var strava = new Strava(city.info.location.latitude, city.info.location.longitude)
    	var weather = new Weather(city.info.location.latitude, city.info.location.longitude, process.env.NCDC_TOKEN);

    	var buildCity = [];

    	buildCity.push(weather.monthlyAverages())
    	buildCity.push(strava.singleCity())

    	Q.all(buildCity).then(function(data) {

    		var weatherData = data[0];
    		var stravaData = data[1];

    		city.running = stravaData[0];
			city.riding = stravaData[1];
			city.datasets.strava = true;

			var weatherObj = {
			station: weather.station,
			elevation: weather.elevation,
			data: weather.fullData
			}

			city.weather = weatherObj;
			city.datasets.weather = true;
			console.log(city)
    		res.send(city)
    	}).catch(function(err) {
    		res.send(err)
    	})

    	/*
    	weather.monthlyAverages().then(function(data) {
	
		var weatherObj = {
			station: weather.station,
			elevation: weather.elevation,
			data: weather.fullData
		}

		city.weather = weatherObj;
		city.datasets.weather = true;

		
		}).catch(function(err) {
			console.log(err)
		})

		strava.singleCity().then(function(data) {
			city.running = data[0];
			city.riding = data[1];
			
			city.datasets.strava = true;
			res.send(city)
		}).catch(function(err) {
			console.log(err)
		})
		*/
    });




		
};