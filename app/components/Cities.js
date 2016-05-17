var React = require('react');

var City = require("./City.js")

var Main = React.createClass({
   
    render: function() {    
      
       return (

            <div> 
            <h3> Cities </h3>
            <div className="row">
            {this.props.cities.map(function(city) {
                return <City key={city._id} data={city}/>
            })}
            </div>
            </div>
        );
  
  
      }
});

module.exports=Main