var React = require('react');


var Terrain = React.createClass({


    getInitialState: function() {
      return {
        terrainControl: {hilly: this.props.defaultStyle, flat: this.props.defaultStyle},
        defaultStyle: this.props.defaultStyle,
        selectedStyle: this.props.selectedStyle
      }
        
    },


    setTerrain: function(e) {

      var component = this;

      var terrainControlStyles = this.state.terrainControl;

      for (var property in terrainControlStyles) {
        if (terrainControlStyles.hasOwnProperty(property)) {
            terrainControlStyles[property] = this.state.defaultStyle
        }
      }

      terrainControlStyles[e.target.value] = this.state.selectedStyle;

      this.setState({terrainControl: terrainControlStyles});

      //SEND TO PARENT HERE
      this.props.updateTerrain({terrain: e.target.value})

      //IF SELECTED
      if (this.props.terrain) {
        if (this.props.terrain === e.target.value) {
          defaultStyles();
          //NEED TO SEND TO PARENT HERE
          this.props.updateTerrain({terrain: null})
        }

      }


      function defaultStyles() {
        var terrainControlStyles = component.state.terrainControl;
        for (var property in terrainControlStyles) {
        if (terrainControlStyles.hasOwnProperty(property)) {
            terrainControlStyles[property] = component.state.defaultStyle
        }
      }
      }

    },


   
    render: function() { 

  
      
       return (
          <div>
            <p> Terrain </p>
            <button className="btn filter-btn btn-two" style={this.state.terrainControl.hilly} value="hilly" onClick={this.setTerrain}> Hilly </button>
            <button className="btn filter-btn btn-two" style={this.state.terrainControl.flat} value="flat" onClick={this.setTerrain}> Flat </button>
          </div>
        );
  
  
      }
});

module.exports=Terrain