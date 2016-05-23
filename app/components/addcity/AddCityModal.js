var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var Location = require("./Location.js");

var Single = require("../Single.js");

var AddCityModal= React.createClass({

    getInitialState: function() {
      return {
        city: "",
        locations: [],
        dataReceived: false,
        }

    },

    changeCity: function(e) {
      this.setState({city: e.target.value})
    },

    geocode: function() {
        //REMOVE ALL DATA FROM PREVIOUS
        this.setState({dataReceived: false, data: {}})

        var component = this;
        var city = this.state.city;

        $.get("/api/geocode?city=" + city, function(data) {
          console.log(data)
          component.setState({locations: data})
        });
    },

    getSegments: function(city) {
    var component = this;
    var url = "/api/getsegs";
    var data = city;
    $.post(url, data, function(data) {

      if (data === "error") {

          component.setState({statusMsg: "We seemed to have encountered an error. Try a different city or email us with your city request."})
          return;
      }


      component.setState({data: data, statusMsg: ""})
      component.setState({dataReceived: true})
    }).fail(function(response) {
      component.setState({statusMsg: "We seemed to have encountered an error. Try a different city or email us with your city request."})
    });
    
    this.setState({statusMsg: "Loading city data now..."})
    },

    declareCity: function(cityChoice) {
      this.setState({chosenCity: cityChoice}, console.log(this.state))

      var cities = this.state.locations;
      var chosenCity = [];
      cities.forEach(function(city) {
        if (city === cityChoice) {
          console.log(city)
          chosenCity.push(city);
        }
      })

      console.log(chosenCity)
      this.setState({locations: chosenCity}, this.getSegments(cityChoice))

    },

    destroy: function() {

      this.props.hideMessage()
      $(".add-city-single").fadeOut("slow");
    },

    checkEnter: function(e) {
      console.log(e.keyCode);

      if (e.keyCode === 13) {
        this.geocode();
      }

    },




    render: function() {

      var component = this;

       return (
 		  <div>
        <Modal dialogClassName="addCityModal" show={this.props.showMessage} backdrop={true}  keyboard={true} onHide={this.destroy} >

          <Modal.Header closeButton><h1> Add Your City </h1></Modal.Header>
          <Modal.Body>
            

            <input type="text" onChange={this.changeCity} value={this.state.city} onKeyDown={this.checkEnter}/>
            <button className="btn filter-btn" onClick={this.geocode}>Find City</button>

            <div className="location-buttons row">
            {this.state.locations.map(function(city) {
              return <Location declareCity={component.declareCity} key={city.id} city={city}/>
            })}
            </div>

            <p> {this.state.statusMsg} </p>

            <div className="add-city-single">
            {this.state.dataReceived ? <Single data={this.state.data} weatherContainer={"modal-chart"} addCity={true} /> : null }
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.destroy}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=AddCityModal;

