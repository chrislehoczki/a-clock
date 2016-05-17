var React = require('react');


var Temp = React.createClass({


    getInitialState: function() {
      return {
        tempControl: {hot: this.props.defaultStyle, warm: this.props.defaultStyle, cool: this.props.defaultStyle},
        defaultStyle: this.props.defaultStyle,
        selectedStyle: this.props.selectedStyle
      }
        
    },




    setTemperature: function(e) {

      var component = this;
      var hotStyle = this.state.tempControl.hot;
      var warmStyle = this.state.tempControl.warm;
      var coldStyle = this.state.tempControl.cold;

      var tempControlStyles = this.state.tempControl;

      for (var property in tempControlStyles) {
        if (tempControlStyles.hasOwnProperty(property)) {
            tempControlStyles[property] = this.state.defaultStyle
        }
      }

      tempControlStyles[e.target.value] = this.state.selectedStyle;

      this.setState({tempControl: tempControlStyles});


      var temp = e.target.value;

      var lookup = {
        hot: {min: 26, max: 60},
        warm: {min: 16, max: 25},
        cool: {min: -20, max: 15}
      }
    

      var tempQuery = lookup[temp]

      //SEND TO PARENT HERE
      this.props.updateTemp({temp: tempQuery})

      //IF SELECTED
      if (this.props.temp) {
        if (this.props.temp.min === tempQuery.min) {
          defaultStyles();
          //NEED TO SEND TO PARENT HERE
          this.props.updateTemp({temp: null})
        }

      }


      function defaultStyles() {
        var tempControlStyles = component.state.tempControl;
        for (var property in tempControlStyles) {
        if (tempControlStyles.hasOwnProperty(property)) {
            tempControlStyles[property] = component.state.defaultStyle
        }
      }
      }

    },


   
    render: function() { 

  
      
       return (
          <div>
            <p> I like it </p>
            <button style={this.state.tempControl.hot} value="hot" onClick={this.setTemperature} data-toggle="tooltip" data-placement="top" title={"26+ deg C"}> Hot </button>
            <button style={this.state.tempControl.warm} value="warm" onClick={this.setTemperature} data-toggle="tooltip" data-placement="top" title={"15 to 26 deg C"}> Warm </button>
            <button style={this.state.tempControl.cool} value="cool" onClick={this.setTemperature} data-toggle="tooltip" data-placement="top" title={"-5 to 15 deg C"}> Cold </button>
          </div>
        );
  
  
      }
});

module.exports=Temp