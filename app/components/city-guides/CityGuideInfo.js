var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var Modal = ReactBootstrap.Modal;


var CityGuidesInfo= React.createClass({

    getInitialState: function() {
      return {

        }

    },

    addCityGuide: function() {
      var component = this;
      var user = JSON.parse(document.getElementById("user").innerHTML);

      if (user !== "none") {
        console.log("has a user")
        var data = {
        slug: this.props.data.info.city.slug,
        cityName: this.props.data.info.city.name + ", " + this.props.data.info.country.name
      }

      $.post("/api/guides", data, function(data) {
        console.log(data);
        component.setState({success: "Congratulations, you've just added yourself as a city guide!"})
      });
      }
      else {
        this.setState({message: "You must be logged in to add yourself as a city guide."})
      } 
    },

    tweetIt: function () {
      var phrase = "I just became a city guide for " + this.props.data.info.city.name + ", " + this.props.data.info.country.name + "! #runanywhere #rideanywhere"
      var tweetUrl = 'https://twitter.com/share?text=' +
        encodeURIComponent(phrase) +
        '.' +
        '&url=' +
        'http://www.nomadathlete.com/';
        
      window.open(tweetUrl);
    },

    showLoginModal: function() {
        var showLoginEvent = new CustomEvent('showLogin');
        window.dispatchEvent(showLoginEvent);   
    },

    render: function() {

      var component = this;

       return (
 		  <div>
        <Modal show={this.props.showMessage} backdrop={true}  keyboard={true} onHide={this.props.hideMessage} >

          <Modal.Header closeButton><h3 className="sub-title">City Guides</h3></Modal.Header>
          <Modal.Body>
            <p> We want everyone in the world to be able to travel freely and be able to link with other people that work out around the world. </p>
            <p> Our city guides are nice people that want to share the best that their cities have to offer with others </p>
            <p> Our city guides respond to messages from people that might be travelling to their city, and support them with their activities. </p>
            <p> This means that you should be able to respond to emails within a few days, and give advice to people on routes, nutrition, and groups they can join. </p>
            <p> Sound like a good idea? We think so. </p>

            <button className="btn main-btn btn-block" onClick={this.addCityGuide} > Become a guide for {component.props.data.info.city.name} </button>
            {this.state.message ? <div><p className="alert alert-warning">{this.state.message}</p> <button onClick={this.showLoginModal} className="btn main-btn">Login Now</button></div>: null }
            {this.state.success ? <div><p className="alert alert-success">{this.state.success}</p> <button onClick={this.tweetIt} className="btn main-btn">Tweet Your Friends</button></div> : null }
            {this.state.success ? null : 
              <div>
              <p> The SmallPrint </p>
            <p> We will never share your email address with others and will not share any of your personal details. People will email you with a return email address, all you have
            to do is email them back. </p>
            <p> If at any point you would like to stop being a city guide, simply go to your profile and remove yourself. </p>
            </div>
            }
            
          </Modal.Body>

          <Modal.Footer>
            <button className="btn filter-btn" onClick={this.props.hideMessage}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=CityGuidesInfo;

