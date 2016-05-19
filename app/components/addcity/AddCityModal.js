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
      console.log("receiving data")
      console.log(data)
      component.setState({data: data})
      setTimeout(function(){ 


        console.log(component.state)
        component.setState({dataReceived: true})


      },5000)
    });
    

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




    render: function() {

      var component = this;

       return (
 		  <div>
        <Modal dialogClassName="addCityModal" show={this.props.showMessage} >

          <Modal.Body>
            <h1> Add Your City </h1>

            <input type="text" onChange={this.changeCity} value={this.state.city} />
            <button className="btn btn-primary" onClick={this.geocode}>Find City</button>

            <div className="location-buttons row">
            {this.state.locations.map(function(city) {
              return <Location declareCity={component.declareCity} key={city.id} city={city}/>
            })}
            </div>

            {this.state.dataReceived ? <Single data={this.state.data} /> : null }




          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.hideMessage}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=AddCityModal;

