var React = require('react');

var TopCity = require("./TopCity.js")
var DataDisplay = React.createClass({


    getInitialState: function() {
    return { 
        running: [],
        riding: [],
        hotel: [],
        altitude: [],
        data: false
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

            <h4> Top Three </h4>

            <h4> Total Runners </h4>
            {this.state.running.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}

            <h4> Total Riders </h4>
            {this.state.riding.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}

            <h4> Highest </h4>
            {this.state.altitude.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}

            <h4> Cheapest </h4>
            {this.state.hotel.map(function(city) {
                return <TopCity key={city.info.city.slug} city={city} />
            })}
           
            </div>
        );
  
  
      }
});

module.exports=DataDisplay