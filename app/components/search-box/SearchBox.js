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
            

       return (
            <div className="search-box">
            <input type="text" value={this.state.value} onChange={this.changeValue} onKeyUp={this.searchIt} onSelect={this.selectValue} list="cities"/>
            <datalist id="cities">
            {this.state.matchingCities.map(function(city) {
                return <Option key={city.info.city.slug} city={city}/>
            })}
            </datalist>

            </div>
        );
  
  
      }
});

module.exports=SearchBox