var React = require('react');

var Option = require("./Option.js")
var SearchBox = React.createClass({


    getInitialState: function() {
    return { 
        value: "",
        cities: []
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
            <div>
            <h4> Search Cities </h4>
            <input type="text" value={this.state.value} onChange={this.changeValue} onSelect={this.selectValue} list="languages"/>
            <datalist id="languages">
            {this.state.cities.map(function(city) {
                return <Option key={city.info.city.slug} city={city}/>
            })}
            </datalist>

            </div>
        );
  
  
      }
});

module.exports=SearchBox