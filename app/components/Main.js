var React = require('react');
var Cities = require("./Cities.js");
var Filter = require("./Filter.js");


var Main = React.createClass({


    getInitialState: function() {
        return {data: this.props.data};
    },

    updateCities: function(data) {
        this.setState({data: data}, console.log(this.state.data));
    },

   
    render: function() {    
      
       return (

            <div> 
                <Filter updateCities={this.updateCities}/>
                <Cities cities={this.state.data} />
            </div>
        );
  
  
      }
});

module.exports=Main