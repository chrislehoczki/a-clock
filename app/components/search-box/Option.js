var React = require('react');


var Option = React.createClass({
    
    render: function() {
        

       return (
            <option value={this.props.city.info.city.name + ", " + this.props.city.info.country.name}></option>
        );
  
  
      }
});

module.exports=Option