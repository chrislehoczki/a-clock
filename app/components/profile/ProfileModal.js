var React = require('react');
var ReactBootstrap = require("react-bootstrap")

var Modal = ReactBootstrap.Modal;
var GuideCity = require("./GuideCity.js")

var Profile= React.createClass({

    getInitialState: function() {
      return {
        user: {guideCities: [], tips: []}
        }

    },

    getUser: function() {
      var component = this;
      this.setState({user: this.props.user})
        console.log("its being shown")
        $.get("/api/user", function(data) {
          console.log(data)
        component.setState({user: data[0]})
        })
     
      
    },

    componentDidMount: function() {

      this.getUser();
    },


    render: function() {

      var component = this;

      var firstName = "";
      var secondName = "";
      var img = "";


      var user = this.state.user;

      console.log(user)
      if (user.strava) {
        firstName = user.strava.details.firstName;
        secondName = user.strava.details.secondName;
        img = user.strava.details.profileImg;
      }
      else if (user.facebook) {
        firstName = user.facebook.firstName;
        secondName = user.facebook.secondName;
        img = "/public/images/profile.png";
      }

      var style = {width: "100px", height: "100px"}




       return (
      <div>
        <Modal dialogClassName="profileModal" onEntering={this.getUser} show={this.props.showMessage} backdrop={true}  keyboard={true} onHide={this.props.hideMessage} >

          <Modal.Header closeButton><h4 className="sub-title"> Profile </h4></Modal.Header>
          <Modal.Body>
          <h4> {firstName + " " + secondName} </h4>
          <img src={img} style={style} />

          <h4> My Cities </h4>
          {this.state.user.guideCities.length > 0 ? 
            this.state.user.guideCities.map(function(city) {
            return <GuideCity getUser={component.getUser} city={city} />
          })
            : <p> You haven't made yourself a guide to any cities yet </p>}

          
          <h4> My Tips </h4>
          {this.state.user.tips.length > 0 ? 
            this.state.user.tips.map(function(tip) {
              var date = new Date(tip.date)
            return <div> <p> {date.toDateString()} </p> <p> {tip.tip} </p> </div>
          })
            : <p> You haven't added any tips yet </p> }

          </Modal.Body>

          <Modal.Footer>
            <button className={"btn main-btn"} onClick={this.props.hideMessage}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=Profile;

