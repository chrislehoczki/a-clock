var React = require('react');

var LoginModal = require("./Login.js");
var SignupModal = require("./Signup.js");
var IntroText = require("./IntroText.js");
var Overview = require("./single/Overview.js");

var Header = React.createClass({

     getInitialState: function() {
        return { 
          attr: ""
        };
    },

    componentDidMount: function() {

      if (this.props.type === "single") {

        //IMAGE
        var component = this;
        var url = "/api/flickr"
        var query = {};
        query.lat = this.props.data.info.location.latitude;
        query.long = this.props.data.info.location.longitude;
        query.city = this.props.data.info.city.name;
        query.country = this.props.data.info.country.name;
        
        $.get(url, query, function(data) {
            component.setState({img: data.img, attr: data.attr});
            var style = {
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + data.img + ")" 
            }

            component.setState({style: style})
        });


      }
    
    },

    render: function() {   

     if (this.props.type === "front") {
        var headerStyle = {backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/public/images/header.jpg)"}
      }
      else {
        var headerStyle = this.state.style;
      } 
      
       return (



            <div className="header-full" style={headerStyle}>
        <div className="navigation-holder">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Nomad Athlete</a>
          </div>

          <div id="navbar" className="navbar-collapse collapse" aria-expanded="false">
            <ul className="nav navbar-nav">
           
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
               <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li className="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
              <li><a href="/profile" >Profile</a></li>
              <li><a href="/logout" >Logout</a></li>
            </ul>
          </div>
          </div>

          {this.props.type === "front" ?  
            <IntroText /> : 
            <div className="single-header-text-holder">
            <h3 className="single-header-text"> {this.props.data.info.city.name}, {this.props.data.info.country.name} </h3>
            <Overview data={this.props.data} />
            <a target="_blank" className="img-attribution" href={this.state.attr}>Image Author</a> 
            </div>
          }


          
          <LoginModal changeModal={this.changeModal} showMessage={this.state.showLoginModal} hideMessage={this.hideLoginModal}/>
          <SignupModal showMessage={this.state.showSignupModal} hideMessage={this.hideSignupModal}/>
        </div>

        );
  
  
      }
});

module.exports=Header