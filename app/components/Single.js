var React = require('react');
var ReactBootstrap = require("react-bootstrap")

var Segments = require("./single/Segments.js")
var Groups = require("./single/Groups.js");
var Users = require("./single/Users.js");
var CityImage = require("./CityImage.js");
var Nutrition = require("./single/Nutrition.js");
var Tips = require("./single/Tips.js");
var UserForm = require("./single/UserForm.js");
var Description = require("./single/Description.js");
var Weather = require("./single/weather.js")



var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;

var Main = React.createClass({


    getInitialState: function() {
        
    return {
        data: this.props.data,
        flight: ""
        };
    },

    componentDidMount: function() {
        console.log(this.state.data.info.city.slug)
        //IMAGE
        var component = this;
        var url = "/api/flickr"
        var query = {};
        query.lat = this.props.data.info.location.latitude;
        query.long = this.props.data.info.location.longitude;
        query.city = this.props.data.info.city.name;
        query.country = this.props.data.info.country.name;
        
        $.get(url, query, function(data) {
            console.log(data.img);
            component.setState({img: data.img, attr: data.attr});
            var style = {
                background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(" + data.img + ") no-repeat center center"
            }

            component.setState({style: style})
        });

        //FLIGHT
        var url = "/api/skyscan"
        var query = {};
        query.origin = "Manchester" //THIS WILL BE CODED ON SERVER IN FUTURE
        query.destination = this.props.data.info.city.name;

        
        $.get(url, query, function(data) {
            console.log(data);
            component.setState({flight: data});
        });




    },
   
    render: function() {    
      
      
       return (

            <div>
                <div style={this.state.style} className="single-photo">
                    <h3> {this.state.data.info.city.name}, {this.state.data.info.country.name} </h3>
                    <a target="_blank" className="img-attribution" href={this.state.attr}>Image Author</a>
                </div>
                <div className="single-overview"> 
                    
                    <p> Runners: {this.state.data.running.runnerCount} </p>
                    <p> Riders: {this.state.data.riding.riderCount} </p>
                    <p> Hotel Cost: ${this.state.data.cost.hotel.USD} </p>
                    <p> AirBnB Cost: {this.state.data.cost.airbnb_median.USD} </p>
                    <a target="_blank" href={this.state.flight.url}> <p> Flight: {this.state.flight.price} </p> </a>
                </div>

                <div className="single-intro">
                {this.state.data.description ? 
                    <h3> {this.state.data.description.description} </h3> :
                    <Description slug={this.state.data.info.city.slug} />
                }
                </div>

                <Accordion className="single-details">
                <Panel header="Athletes" eventKey="1">
                    <div className="single-users">
                        <Users riders={this.state.data.riding.riders} runners={this.state.data.running.runners} />
                    </div>
                </Panel>

                <Panel header="Segments" eventKey="2">
                    <div className="single-segments">
                        <Segments ridingSegments={this.state.data.riding.segments} runningSegments={this.state.data.running.segments} />
                    </div>
                </Panel>
                <Panel header="Groups" eventKey="3">
                    <div className="single-groups"> 
                        <Groups city={this.state.data.info} />
                    </div>
                </Panel>
                <Panel header="Weather" eventKey="4">
                    <div className="single-groups"> 
                        <Weather city={this.state.data.info.city.name} weather={this.state.data.weather} />
                    </div>
                </Panel>
                 <Panel header="Nutrition" eventKey="5">
                    <div className="single-tips">
                        <Nutrition city={this.state.data.info} />
                    </div>
                </Panel>
                <Panel header="Tips" eventKey="6">
                    <div className="single-tips">
                        <Tips slug={this.state.data.info.city.slug} />
                    </div>
                </Panel>
                </Accordion>
                
            </div>
        );
  
  
      }
});

module.exports=Main