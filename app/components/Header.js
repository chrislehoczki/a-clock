var React = require('react');

var LoginModal = require("./Login.js")
var SignupModal = require("./Signup.js")

var Header = React.createClass({

    getInitialState: function() {
        return { 
          showSignupModal: false,
          showLoginModal: false
        };
    },


    showLoginModal: function() {
        this.setState({showLoginModal: true})
    },

    hideLoginModal: function () {
      this.setState({showLoginModal: false})
    },

    showSignupModal: function () {
      this.setState({showSignupModal: true})
    },

    hideSignupModal: function () {
      this.setState({showSignupModal: false})
    },

    changeModal: function() {
      this.setState({showLoginModal: false}) 
      this.setState({showSignupModal: true})     
    },

    render: function() {    
      
       return (

            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            Nomad Athlete
                        </a>
                    </div>

                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="#" onClick={this.showSignupModal}>Sign Up</a></li>
                        <li><a href="#" onClick={this.showLoginModal}>Login</a></li>
                    </ul>
      
                </div>
                <LoginModal changeModal={this.changeModal} showMessage={this.state.showLoginModal} hideMessage={this.hideLoginModal}/>
                <SignupModal showMessage={this.state.showSignupModal} hideMessage={this.hideSignupModal}/>
            </nav>



        );
  
  
      }
});

module.exports=Header