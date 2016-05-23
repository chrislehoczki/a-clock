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

        //IF PASSWORDS DONT MATCH
      if (component.state.password !== component.state.confirmPassword) {
        component.setState({passwordMatch: "Your passwords do not match.", confirmPasswordAlert: "warning"})
        return;
      }

      //IF PASSWORD OR USER IS NOT ENTERED CORRECTLY / ALREADY USED
      if (!component.state.userOK || !component.state.passwordOK) {
        return;
      }

      //IF THERE IS NO CONFIRM PASSWORD
      if (!component.state.confirmPassword) {
        return;
      }

      //MAKE PARAMS HERE
      var url = "/signup"
      

      var username = this.state.user;
      var password = this.state.confirmPassword;
        console.log(username)
      var params = "username=" + username + "&password=" + password;
        console.log(params)
      ajaxFunctions.postRequest("POST", url, params, function(data) {
          if (data.length < 100) {
              component.setState({errorMessage: data})
          }
          else {
            window.location.replace("/");
          }

      })

    },

    checkUsername: function(e) {

        var component = this;
        var user = e.target.value;

        var url = "/checkuser/" + user;

        ajaxFunctions.ajaxRequest("GET", url, function(data) {
          console.log(data)
            data = JSON.parse(data)
            component.setState({usernameMessage: data.message, userAlert: data.alert}, function() {
                if (data.alert === "success") {
                  component.setState({userOK: true})
                }
                else {
                  component.setState({userOK: false})
                }
            })
        })


    },

    addUser: function (e) {
      var user = e.target.value;
      this.setState({user: user})
    },


    addPassword: function(e) {
          var component = this;
          var password = e.target.value;
          this.setState({password: password}, function() {
            if (component.state.password === "") {
          component.setState({passwordMessage: "", passwordAlert: "success"})
        }
          })

        var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/

        var test = password.match(regex)
        
          if (test) {
            this.setState({passwordMessage: "", passwordAlert: "success", passwordOK: true}, console.log(this.state))

          }
  
          else {
            this.setState({passwordMessage: " Your password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number", passwordAlert: "warning", passwordOK: false}, console.log(this.state))
         }

    },

    confirmPassword: function (e) {
      var component = this;
        this.setState({confirmPassword: e.target.value}, function() {
            if (component.state.password !== component.state.confirmPassword) {
              component.setState({passwordMatch: "Your passwords don't match!", confirmPasswordAlert: "warning"}, console.log(this.state))
            }
            else {
              component.setState({passwordMatch: "", confirmPasswordAlert: "success"}, console.log(this.state))
            }

        })

    },

    createUserMarkup: function(data, alertType) {
        if (!data) {
          return null;
        }

         return {__html: '<div class="alert alert-' + alertType + '">' + data + '</div>'};
      },

    createPasswordMarkup: function(data, alertType) {
      if (!data) {
          return null;
        }
         return {__html: '<div class="alert alert-' + alertType + '">' + data + '</div>'};
      },

    createConfirmPasswordMarkup: function(data, alertType) {
      if (!data) {
          return null;
        }
         return {__html: '<div class="alert alert-' + alertType + '">' + data + '</div>'};
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

      var margin = {
        margin: "10px"
      }


       return (
 		  <div>
        <Modal style={center} show={this.props.showMessage} onHide={this.props.hideMessage} >

          <Modal.Body style={center}>
            <h2> Sign Up  </h2>
            <a className="btn btn-social btn-facebook btn-block" href="/auth/facebook">
            <span className="fa fa-facebook"></span> Sign Up with Facebook</a>

            <a className="btn btn-social btn-strava btn-block" href="/auth/strava">
            <span className="fa fa-strava"></span> Sign Up with Strava</a>

            <h4 className="form-element"> Or Sign Up With Username </h4>
            <div className="form-group" >
              <label>Username</label>
              <input type="text" onBlur={this.addUser} onKeyUp={this.checkUsername} className="form-control" name="username" id="username" />
            </div>

            <div dangerouslySetInnerHTML={this.createUserMarkup(this.state.usernameMessage, this.state.userAlert)} />

            <div className="form-group">
            <label>Password</label>
            <input type="password" onKeyUp={this.addPassword} className="form-control" name="password" />
            </div>

            <div dangerouslySetInnerHTML={this.createPasswordMarkup(this.state.passwordMessage, this.state.passwordAlert)} />


            <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" onKeyUp={this.confirmPassword} className="form-control" name="confirmpassword" id="password"/>


            <div dangerouslySetInnerHTML={this.createConfirmPasswordMarkup(this.state.passwordMatch, this.state.confirmPasswordAlert)} />
            </div>
            <button  type="submit" onClick={this.sendForm} className="btn btn-primary">Submit</button>
            
            <div dangerouslySetInnerHTML={this.createErrorMarkup(this.state.errorMessage)} />
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

