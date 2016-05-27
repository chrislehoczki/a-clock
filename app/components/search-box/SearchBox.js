var React = require('react');

var Option = require("./Option.js")
var SearchBox = React.createClass({


    getInitialState: function() {
    return { 
        value: "",
        cities: [],
        matchingCities: []
    };
    },

    componentDidMount: function() {
        var url = "/api/citynames"
        $.get(url, function(data) {
            this.setState({cities: data})
        }.bind(this))

    },

    changeValue: function(e) {
        this.setState({value: e.target.value})
    },

    searchIt: function() {
        var component = this;
        $("body").on("click", function() {
            setTimeout(function() {component.setState({matchingCities: []}) },30)
        })

        this.setState({style: {height: "0px"}})
        var city = this.state.value;
        var cities = this.state.cities;

        var matchingCities = [];

        for (var i = 0; i < cities.length; i++) {
            if (city.substr(0, city.length).toUpperCase() === cities[i].info.city.name.substr(0, city.length).toUpperCase()) {
                matchingCities.push(cities[i])
            }

        }

        matchingCities = matchingCities.splice(0, 5)

        this.setState({matchingCities: matchingCities})
        this.setState({style: {height: "auto"}})
    },

    selectValue: function(e) {
    
        var city = e.target.value;
        var cityName = city.split(",")[0]
        var cities = this.state.cities;

        cities.forEach(function(city) {
            if (city.info.city.name === cityName) {
                location.replace("/city/" + city.info.city.slug);
            }
        })

    },

    
    render: function() {
            
        var component = this;
       return (
            <div className="search-box">
            <input type="text" value={this.state.value} onChange={this.changeValue} onKeyUp={this.searchIt} onSelect={this.selectValue}/>
            <div className="search-dropdown">
            {this.state.matchingCities.map(function(city) {
                return <Option style={component.state.style} key={city.info.city.slug} city={city}/>
            })}
            </div>
            </div>
        );
  
  
      }
});

module.exports=SearchBox