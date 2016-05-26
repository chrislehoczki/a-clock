var React = require('react');


var Sort = React.createClass({

    getInitialState: function() {
      return {
        altControl: {low: this.props.defaultStyle, medium: this.props.defaultStyle, high: this.props.defaultStyle},
        defaultStyle: this.props.defaultStyle,
        selectedStyle: this.props.selectedStyle
      }
        
    },

    setAlt: function(e) {

      var component = this;

      var altControlStyles = this.state.altControl;

      for (var property in altControlStyles) {
        if (altControlStyles.hasOwnProperty(property)) {
            altControlStyles[property] = this.state.defaultStyle
        }
      }

      altControlStyles[e.target.value] = this.state.selectedStyle;

      this.setState({altControl: altControlStyles});


      var alt = e.target.value;
      
      function convertMtoFt(value) {
        return value * 3.28;
      }

      var lookup = {
        low: {min: -10, max: 500},
        medium: {min: 500, max: 1000},
        high: {min: 1000, max: 9000}
      }


    

      var altQuery = lookup[alt]

      //SEND TO PARENT HERE
      this.props.updateAlt({alt: altQuery})

      //IF SELECTED
      if (this.props.alt) {
        if (this.props.alt.min === altQuery.min) {
          defaultStyles();
          //NEED TO SEND TO PARENT HERE
          this.props.updateAlt({alt: null})
        }

      }


      function defaultStyles() {
        var altControlStyles = component.state.altControl;
        for (var property in altControlStyles) {
          if (altControlStyles.hasOwnProperty(property)) {
              altControlStyles[property] = component.state.defaultStyle
          }
        }
      }

    },

    render: function() { 
       return (
        <div>
         <p> Altitude </p>
          
            <button className="btn filter-btn btn-three" style={this.state.altControl.low} value="low" onClick={this.setAlt} data-toggle="tooltip" data-placement="top" title={"0 - 500m"}>Low</button>
            <button className="btn filter-btn btn-three" style={this.state.altControl.medium} value="medium" onClick={this.setAlt} data-toggle="tooltip" data-placement="top" title={"500 - 1000m"}>Med</button>
            <button className="btn filter-btn btn-three" style={this.state.altControl.high} value="high" onClick={this.setAlt} data-toggle="tooltip" data-placement="top" title={"1000m+"}>High</button>
            
          
        </div>
        );
  
  
      }
});

module.exports=Sort