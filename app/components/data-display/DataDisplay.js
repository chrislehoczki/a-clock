var React = require('react');

var TopCity = require("./TopCity.js")
var DataDisplay = React.createClass({


    getInitialState: function() {
    return { 
        running: [],
        riding: [],
        hotel: [],
        altitude: []
    };
    },

    componentDidMount: function() {

        var url = "/api/totals"
        $.get(url, function(data) {
            this.setState({running: data.running, riding: data.riding, altitude: data.elevation, hotel: data.cost}, console.log(this.state))

        }.bind(this))

    },

    
    render: function() {
            

       return (
            <div>
            <p> Top Cities </p>

            <p> Total Runners </p>
            {this.state.running.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}

            <p> Total Riders </p>
            {this.state.riding.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}

            <p> Highest </p>
            {this.state.altitude.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}

            <p> Cheapest </p>
            {this.state.hotel.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}
           
            </div>
        );
  
  
      }
});

module.exports=DataDisplay