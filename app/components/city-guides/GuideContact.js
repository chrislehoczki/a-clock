var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var Modal = ReactBootstrap.Modal;


var ContactGuide= React.createClass({

    getInitialState: function() {
      return {
          
        }

    },

    sendData: function() {

      var body = {
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject
      }


    $.post("/api/contactguide", body, function(data) {
      console.log(data)
    })


    },

    addName: function(e) {
      this.setState({name: e.target.value})
    },

    addEmail: function(e) {
      this.setState({email: e.target.value})
    },

    addSubject: function(e) {
      this.setState({subject: e.target.value})
    },

    render: function() {

      var component = this;

       return (
 		  <div>
        <Modal show={this.props.showMessage} backdrop={true}  keyboard={true} onHide={this.props.hideMessage} >

          <Modal.Header closeButton><h3 className="sub-title">Contact Guide</h3></Modal.Header>
          <Modal.Body>
          <p>Your Name</p>
          <input onChange={this.addName} value={this.state.name} className="form-control" type="text"></input>
          <p> Your Email </p>
          <input onChange={this.addEmail} value={this.state.email} className="form-control" type="text"></input>
          <p> Subject </p>
          <textarea onChange={this.addSubject} value={this.state.subject} className="form-control"></textarea>
          
          <button className="btn main-btn" onClick={this.sendData}>Send</button>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn filter-btn" onClick={this.props.hideMessage}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=ContactGuide;

