var React = require('react');


var Guide = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
      $("#" + this.props.data.user.id)
        .on('load', function() { })
        .on('error', function() {  $(this).attr("src", "/public/images/profile.png") })
    },
   
    render: function() {  


         return <div className="athlete col-lg-2 col-md-3 col-sm-3 col-xs-6" >
                        <img id={this.props.data.user.id} className="athlete-img" src={this.props.data.user.img} alt={this.props.data.user.firstName + " " + this.props.data.user.secondName} data-toggle="tooltip" data-placement="top" title={this.props.data.user.firstName + " " + this.props.data.user.secondName} />
                </div>;
      

  
      }
});

module.exports=Guide