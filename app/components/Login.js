var React = require('react');
var ReactBootstrap = require("react-bootstrap")

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var SignupModal= React.createClass({


        getInitialState: function() {
    return { 
        userOK: false,
        passwordOK: false
    };
    },

    sendForm: function() {

      var component = this;
      //MAKE PARAMS HERE
      var url = "/login"
      
      var username = this.state.user;
      var password = this.state.password;
      var params = "username=" + username + "&password=" + password;
        console.log(params)
      ajaxFunctions.postRequest("POST", url, params, function(data) {
          if (data.length < 100) {
            console.log(data)
              component.setState({errorMessage: data})
          }
          else {
            window.location.replace("/");
          }

      })

    },

    addUser: function(e) {
      var user = e.target.value;
      this.setState({user: user})

    },

    addPassword: function(e) {
      var password = e.target.value;
      this.setState({password: password})

    },

    createErrorMarkup: function(data) {
      if (!data) {
          return null;
        }
         return {__html: '<div class="alert alert-' + 'danger' + '">' + data + '</div>'};
      },

    render: function() {

    	var inline = {
    		display: "inline",
    	}

    	var center = {
    		textAlign: "center"
    	}

      var image = {
        width: "100px",
        height: "100px"
      }

      var form = {
        textAlign: "center"
      }


       return (
 		  <div>
        <Modal style={center} show={this.props.showMessage} onHide={this.props.hideMessage} >

          <Modal.Body style={center}>

        <h2> Log In </h2>  
       <div className="signup-container"> 

    <a className="btn btn-social btn-facebook btn-block" href="/auth/facebook">
    <span className="fa fa-facebook"></span> Login with Facebook</a>

    <a className="btn btn-social btn-strava btn-block" href="/auth/strava">
    <span className="fa fa-strava"></span> Login with Strava</a>

    <h4 className="form-element"> Or Login With Username </h4>


    <div className="form-group">
      <label>Username</label>
      <input onKeyUp={this.addUser} type="text" className="form-control" name="username"/>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input onKeyUp={this.addPassword} type="password" className="form-control" name="password"/>
    </div>
    <button type="submit" onClick={this.sendForm} className="btn btn-primary btn-block">Sign In</button>

    <div dangerouslySetInnerHTML={this.createErrorMarkup(this.state.errorMessage)} />

      <p className="form-element"> Not got an account yet? </p> <button onClick={this.props.changeModal} className="show-signup btn btn-secondary"> Sign Up </button>
      </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.hideMessage}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=SignupModal;

