var React = require('react');

var DataDisplay = require("./sidebar/DataDisplay.js");
var SearchBox = require("./sidebar/SearchBox.js")
var About = require("./sidebar/About.js")

var SideBar = React.createClass({

    render: function() {
            
       return (

            <div> 
            <SearchBox />
            <About />
            <DataDisplay />
            </div>
        );
  
  
      }
});

module.exports=SideBar