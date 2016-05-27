var React = require('react');

var DataDisplay = require("./sidebar/DataDisplay.js");
var About = require("./sidebar/About.js")


var SideBar = React.createClass({

    render: function() {
            
       return (

            <div> 
            <About />
            <DataDisplay />
            </div>
        );
  
  
      }
});

module.exports=SideBar