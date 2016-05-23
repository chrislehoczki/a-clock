var React = require('react');


var User = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
      $("#" + this.props.athlete.id)
        .on('load', function() { })
        .on('error', function() {  $(this).attr("src", "/public/images/profile.png") })
    },
   
    render: function() {  

        var href = "http://www.strava.com/athletes/" + this.props.athlete.id;

         if (this.props.athlete.pic === "avatar/athlete/large.png") {
             return null;
        }

        else {
         return <div className="athlete col-lg-2 col-md-3 col-sm-3 col-xs-6" >
                    <a href={href} target="_blank">
                        <img id={this.props.athlete.id} onError={this.checkError} className="athlete-img" src={this.props.athlete.pic} alt={this.props.athlete.name} data-toggle="tooltip" data-placement="top" title={this.props.athlete.name} />
                    </a>
                </div>;
        }  
      

  
      }
});

module.exports=User