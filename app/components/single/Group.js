var React = require('react');

var User = React.createClass({

   
    render: function() { 

        var href =  "http://facebook.com/" + this.props.group.id;

         return (

          <div className="single-group">
          <a target="_blank" href={href}> <h4> {this.props.group.name} </h4> </a>
          </div>


      )
      }
});

module.exports=User