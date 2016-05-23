var React = require('react');
var Cities = require("./Cities.js");
var Filter = require("./Filter.js");

var Map = require("./map/Map.js")

var Main = React.createClass({


    getInitialState: function() {
        return {data: this.props.data,
            view: "list",
            btnMessage: "Map View"
        };
    },

    updateCities: function(data) {
        this.setState({data: data});
    },


    changeView: function() {

        if (this.state.view === "list") {
            this.setState({view: "map", btnMessage: "List View"})
        }
        else {
            this.setState({view: "list", btnMessage: "Map View"})
        }

    },

   
    render: function() {    
      
       return (

            <div> 
                
                <Filter updateCities={this.updateCities}/>
                <button style={{zIndex: 999}} onClick={this.changeView} className="filter-btn pull-right">{this.state.btnMessage}</button>
                <div style={{clear:"both"}}> </div>
                {this.state.view === "list" ? <Cities cities={this.state.data} /> : <Map cities={this.state.data} />}
                
                
            </div>
        );
  
  
      }
});

module.exports=Main