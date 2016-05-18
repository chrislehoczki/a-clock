var React = require('react');
var Range = require('react-range');

var Cities = require("./Cities.js")

var Temp = require("./filter/Temp.js");
var Hotel = require("./filter/Hotel.js");
var Terrain = require("./filter/Terrain.js");
var Month = require("./filter/Month.js");
var Continent = require("./filter/Continent.js");
var Sort = require("./filter/Sort.js");
var Altitude = require("./filter/Altitude.js");
var Rain = require("./filter/Rain.js");

var Filter = React.createClass({


    getInitialState: function() {

        var date = new Date();
        var month = date.getMonth();

        var defaultStyle = {
            backgroundColor: "#F8F8F8",
            padding: "4px",
            color: "rgb(58, 193, 98)",
            borderRadius: "5%",
            margin: "4px"
        }

        var selectedStyle = {
            backgroundColor: "rgb(58, 193, 98)",
            padding: "4px",
            color: "black",
            borderRadius: "5%",
            margin: "4px"
        }


        return {
                continent: "",
                defaultStyle: defaultStyle,
                selectedStyle: selectedStyle,
                month: month,
                maxRain: 10,
                minHotelCost: 0,
                maxHotelCost: 100,
                limit: 20    
        };
    },


    updateHotel: function(data) {
      this.setState(data);
    },

    sortBy: function(data) {
       
        this.setState(data);
    },

    filter: function() {

        var component = this;
        var query = { 
            minHotelCost: this.state.minHotelCost,
            maxHotelCost: this.state.maxHotelCost,
            sortBy: this.state.sortBy,
            month: this.state.month,
            temp: this.state.temp,
            terrain: this.state.terrain,
            continent: this.state.continent,
            alt: this.state.alt,
            rain: this.state.maxRain,
            limit: this.state.limit
            }

        var url = "/api/cities"

        $.get(url, query, function(data) {
            component.props.updateCities(data);
        })

    },

    updateTemp: function(data) {
      this.setState(data)

    },

    updateRain: function(data) {
      this.setState(data)
    },

    selectMonth: function(data) {
        this.setState(data)
    },

    setTerrain: function(e) {
      this.setState({terrain: e.target.value})
    },

    updateTerrain: function(data) {
      this.setState(data)
    },

    updateAlt: function(data) {
      this.setState(data) 
    },

    selectContinent: function(data) {
      this.setState(data)
    },

    componentDidMount: function() {
        var component = this;

      $('button').tooltip()

      //INFINITE SCROLL
      
        $(window).scroll(function() {
           if($(window).scrollTop() + $(window).height() == $(document).height()) {
               component.setState({limit: component.state.limit + 10})
               component.filter()
           }
        });

       

    },

    render: function() { 

  
      
       return (

            <div className="row">

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Hotel minCost={this.state.minHotelCost} maxCost={this.state.maxHotelCost} updateHotel={this.updateHotel}/>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Temp defaultStyle={this.state.defaultStyle} selectedStyle={this.state.selectedStyle} updateTemp={this.updateTemp} temp={this.state.temp}/>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Rain updateRain={this.updateRain} maxRain={this.state.maxRain} />
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Terrain defaultStyle={this.state.defaultStyle} selectedStyle={this.state.selectedStyle} updateTerrain={this.updateTerrain} terrain={this.state.terrain}/>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Altitude defaultStyle={this.state.defaultStyle} selectedStyle={this.state.selectedStyle} updateAlt={this.updateAlt} alt={this.state.alt}/>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Month selectMonth={this.selectMonth} month={this.state.month} />
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Continent selectContinent={this.selectContinent}/>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <Sort sortBy={this.sortBy} />
            </div>

          
            <button className="btn btn-primary" onClick={this.filter}>Filter</button>
            </div>
            
        );
  
  
      }
});

module.exports=Filter