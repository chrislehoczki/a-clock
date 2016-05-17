var React = require('react');

var Restaurant = React.createClass({

   
    render: function() { 
      
    	var src;

    	if (this.props.data.photo[0]) {
    		src = this.props.data.photo[0].prefix + "100x100" + this.props.data.photo[0].suffix;
    	}
    	else {
    		src = "/public/images/food-placeholder.jpg"
    	}

    	var link = "https://foursquare.com/v/" + this.props.data.name +"/" + this.props.data.id;
    	
      var style = {
        width: "100px",
        height: "100px"
      }

         return (
          <div>
          <a target="_blank" href={link}>
          <img style={style} src={src} />
          <p> {this.props.data.name} </p>
          </a>
          </div>
      )
      }
});

module.exports=Restaurant