require('dotenv').load();

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var routes = require('./app/routes/index.js');
var stravaRoute = require('./app/routes/strava.js');
var geoRoute = require('./app/routes/geo.js');

var request = require('request');
var fs = require("fs");

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
//var flash    = require('connect-flash');



//MODULES FOR ISOMORPHIC REACT

require("node-jsx").install();
var React = require('react');
var ReactDOMServer = require("react-dom/server")
var ReactBootstrap = require("react-bootstrap")



require('./app/config/passport')(passport);

//VIEW ENGINE
app.set("view engine", "ejs");
app.set('views', __dirname + '/public/views');



//MONGOOSE CONNECT
mongoose.connect(process.env.MONGO_URI);

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//STATIC FILES
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/components', express.static(process.cwd() + '/app/components'));

//SESSION INFO

app.use(session({
	secret: 'nomadAthlete',
	resave: false,
	saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
//app.use(flash())

//ROUTES
routes(app, passport);
stravaRoute(app,passport);
geoRoute(app,passport);





var port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});