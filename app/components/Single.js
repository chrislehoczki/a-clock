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
var Weather = require("./single/Weather.js")



var Single = React.createClass({


    getInitialState: function() {
        
    return {
        data: this.props.data,
        flight: ""
        };
    },

    
   
    render: function() {    
      
        var clearFix = {clear: "both"}
      
       return (

            <div>

                
               



                    <div className="single-users">
                        <h3 className="sub-title"> Athletes </h3>
                        <Users riders={this.state.data.riding.riders} runners={this.state.data.running.runners} />
                    </div>



                    <div className="single-segments">
                        <h3 className="sub-title"> Routes </h3>
                        <Segments ridingSegments={this.state.data.riding.segments} runningSegments={this.state.data.running.segments} />
                    </div>

              
                    <div className="single-groups"> 
                        <h3 className="sub-title"> Groups </h3>
                        <Groups city={this.state.data.info} />
                    </div>
            
           
                    <div className="single-weather"> 
                        <h3 className="sub-title"> Weather </h3>
                        <Weather city={this.state.data.info.city.name} weather={this.state.data.weather} data={this.state.data} />
                    </div>
     
       
                    <div className="single-nutrition">
                        <h3 className="sub-title"> Nutrition </h3>
                        <Nutrition city={this.state.data.info} />
                    </div>
 
                    <div style={clearFix}> </div>
                    <div className="single-tips">
                        <h3 className="sub-title"> Tips </h3>
                        <Tips slug={this.state.data.info.city.slug} />
                    </div>

                
            </div>
        );
  
  
      }
});

module.exports=Single