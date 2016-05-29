var React = require('react');


var Guide = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {

        $("img").tooltip();
        console.log(this.props)
      $("#" + this.props.data.user.id)
        .on('load', function() { })
        .on('error', function() {  $(this).attr("src", "/public/images/profile.png") })
    },

    showGuide: function() {
        this.props.showGuide(this.props.data)

    },
   
    render: function() {  


         return <div className="guide col-lg-2 col-md-3 col-sm-3 col-xs-6" onClick={this.showGuide} >
                        <div>
                        <img id={this.props.data.user.id} className="athlete-img" src={this.props.data.user.img} alt={this.props.data.user.firstName + " " + this.props.data.user.secondName} data-toggle="tooltip" data-placement="top" title={this.props.data.user.firstName + " " + this.props.data.user.secondName ? this.props.data.user.secondName : ""} />
                        <p> Contact </p>
                        </div>
                </div>;
      

  
      }
});

module.exports=Guide