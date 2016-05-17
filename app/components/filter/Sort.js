var React = require('react');


var Sort = React.createClass({

    sortBy: function(e) {
      this.setState({sortBy: e.target.value})
      this.props.sortBy({sortBy: e.target.value})
    },

    render: function() { 
       return (
        <div>
          <p> Sort By </p>
          <input type="radio" name="activity" value="running.runnerCount" onChange={this.sortBy}/> Running
          <input type="radio" name="activity" value="riding.riderCount" onChange={this.sortBy} /> Riding
        </div>
        );
  
  
      }
});

module.exports=Sort