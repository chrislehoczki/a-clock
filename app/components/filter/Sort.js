var React = require('react');


var Sort = React.createClass({


    getInitialState: function() {
      return {
        sortControl: {running: this.props.defaultStyle, riding: this.props.defaultStyle},
        defaultStyle: this.props.defaultStyle,
        selectedStyle: this.props.selectedStyle
      }
        
    },


    setSort: function(e) {

      var component = this;

      var sortControlStyles = this.state.sortControl;

      for (var property in sortControlStyles) {
        if (sortControlStyles.hasOwnProperty(property)) {
            sortControlStyles[property] = this.state.defaultStyle
        }
      }

      sortControlStyles[e.target.value] = this.state.selectedStyle;

      this.setState({sortControl: sortControlStyles});

      //SEND TO PARENT HERE
      this.props.updateSort({sortBy: e.target.value})

      //IF SELECTED
      if (this.props.sortBy) {
        if (this.props.sortBy === e.target.value) {
          defaultStyles();
          //NEED TO SEND TO PARENT HERE
          this.props.updateSort({sortBy: null})
        }

      }


      function defaultStyles() {
        var sortControlStyles = component.state.sortControl;
        for (var property in sortControlStyles) {
        if (sortControlStyles.hasOwnProperty(property)) {
            sortControlStyles[property] = component.state.defaultStyle
        }
      }
      }

    },

    render: function() { 
       return (
        <div>
          <p> Sort By </p>
          <button className="btn filter-btn btn-two" style={this.state.sortControl.running} value="running" onClick={this.setSort}> Runners </button>
          <button className="btn filter-btn btn-two" style={this.state.sortControl.riding} value="riding" onClick={this.setSort}> Riders </button>
        </div>
        );
  
  
      }
});

module.exports=Sort