var React = require('react');


var Temp = React.createClass({


    getInitialState: function() {
      return {
        selected: null
      }
        
    },




    setTemperature: function(e) {

      e.preventDefault();

      console.log(e.target);

      var component = this;

      $(".filter-temp a").removeClass("filter-btn-selected")

      console.log(e.target.value)
      console.log(this.state.selected)
      if (this.state.selected === e.target.value) {
          this.props.updateFilter({temp: null})
          return;
      }

      e.target.classList.add("filter-btn-selected");
      this.setState({selected: e.target.value})

      var temp = e.target.value;

      var lookup = {
        hot: {min: 26, max: 60},
        warm: {min: 16, max: 25},
        cool: {min: -20, max: 15}
      }
    

      var tempQuery = lookup[temp]

      //SEND TO PARENT HERE
      this.props.updateFilter({temp: tempQuery})



    },

    render: function() { 

  
      
       return (
          <div>
            <p> Temperature </p>
            <a href="#" className="btn filter-btn btn-three" value="hot" onClick={this.setTemperature} data-toggle="tooltip" data-placement="top" title={"26+ deg C"}> Hot </a>
            <a href="#" className="btn filter-btn btn-three" value="warm" onClick={this.setTemperature} data-toggle="tooltip" data-placement="top" title={"15 to 26 deg C"}> Warm </a>
            <a href="#" className="btn filter-btn btn-three" value="cool" onClick={this.setTemperature} data-toggle="tooltip" data-placement="top" title={"-5 to 15 deg C"}> Cold </a>
          </div>
        );
  
  
      }
});

module.exports=Temp