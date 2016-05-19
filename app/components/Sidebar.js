var React = require('react');

var DataDisplay = require("./data-display/DataDisplay.js");
var SearchBox = require("./SearchBox.js")

var SideBar = React.createClass({

    render: function() {
            var component = this;
       return (

            <div> 
            <SearchBox />
            <DataDisplay />
            </div>
        );
  
  
      }
});

module.exports=SideBar