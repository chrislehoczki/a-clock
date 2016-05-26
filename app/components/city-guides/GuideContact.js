var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var Modal = ReactBootstrap.Modal;


var ContactGuide= React.createClass({

    getInitialState: function() {
      return {
          
        }

    },

    sendData: function() {

      var component = this;
      console.log(this.props)
      var body = {
        guideId: this.props.guide.user.id,
        name: this.state.name,
        subject: this.state.subject,
        info: this.state.info
      }

      if (!this.state.infoAdded || !this.state.nameAdded || !this.state.subjectAdded) {
        component.setState({msg: "You are missing some information in the form, please check again."})
        return;
      }


    $.post("/api/contactguide", body, function(data) {
      component.setState({msg: data})
    })


    },

    addName: function(e) {
      this.setState({name: e.target.value, nameAdded: true})
    },

    addSubject: function(e) {
      this.setState({subject: e.target.value, subjectAdded: true})
    },

    addInfo: function(e) {
      this.setState({info: e.target.value, infoAdded: true})
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
          <p> Subject </p>
          <input onChange={this.addSubject} value={this.state.subject} className="form-control" type="text"></input>
          <p> Message </p>
          <textarea onChange={this.addInfo} value={this.state.info} className="form-control"></textarea>
          
          <button className="btn main-btn" onClick={this.sendData}>Send</button>
          </Modal.Body>

          <Modal.Footer>
            {this.state.msg ? <p className="info info-success">{this.state.msg}</p> : null }
            <button className="btn filter-btn" onClick={this.props.hideMessage}>Close</button>
            
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=ContactGuide;

