
var request = require("request");
var Q = require("q");

module.exports = function (app, passport) {

  var id = "client_id=NLH24D4ZAGNFJ2QCKSPPATPZO01H1MOPV1ALXEHT3P00ENHZ&";
  var secret = "client_secret=N4DA2NIQZSNHEKHZLKOP0NCVZX5YHDCB5OANQS3D34S40AXY&"

  var restaurantObjects = [];

    app.get("/api/foursquare", function(req, res) {
      
        //GET LIST OF RESTARAUNT DATA
        getRestaurants(req.query.lat, req.query.long).then(function(data){
          //BUILD API CALLS
          var apiCalls = buildApiCalls(data);
          
          //SEND API CALLS THEN RETURN ALL RESTAURANT OBJECTS
          Q.all(apiCalls).then(function() {
              console.log(restaurantObjects);
              res.json(restaurantObjects);
            });

        })

    
    });

//GETS MULTIPLE RESTAURANT BASIC DATA
function getRestaurants(lat, long) {

    var deferred = Q.defer();

    //CREATE URL
    var url = "https://api.foursquare.com/v2/venues/explore?" 
    + id 
    + secret 
    + "v=20130815&limit=10&ll=" 
    + lat + "," + long
    + "&query=healthy&limit=10"
    
    //SEND OFF REQUEST FOR RESTAURANTS
    request(url, function (error, response, body) {
        
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        var restaurants = body.response.groups[0].items;
        deferred.resolve(restaurants); 
      }
      else {
        deferred.reject(err)
      }
    });

    return deferred.promise;
};  

//BUILDS ARRAY OF API CALL FUNCTIONS
function buildApiCalls(restaurants) {

  var functions = [];

  restaurants.map(function(restaurant) {
  //create URL to get photos
  var url = "https://api.foursquare.com/v2/venues/" + restaurant.venue.id + "/photos?" + id + secret + "v=20140130";
  var restaurantObject = {
            id: restaurant.venue.id,
            url: restaurant.venue.url,
            name: restaurant.venue.name,
        }

  functions.push(getRestaurant(url, restaurantObject))
  });//end of MAP

  console.log(functions)
  return functions;
}

//FUNCTION TO GET SINGLE RESTAURANT DETAILS
function getRestaurant(url, restaurantObj) {

  var deferred = Q.defer();

  request(url, function (error, response, body) {

  if (!error && response.statusCode == 200) {
    body = JSON.parse(body);
    restaurantObj.photo = body.response.photos.items;
    restaurantObjects.push(restaurantObj)
    deferred.resolve(body.response.photos.items)
  }
  else {
    deferred.reject(err)
  }

  });

  return deferred.promise;
}



};