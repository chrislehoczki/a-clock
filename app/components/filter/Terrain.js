var React = require('react');


var Terrain = React.createClass({

    getInitialState: function() {

        return {
          selected: null
        }
      },

    setTerrain: function(e) {
      e.preventDefault();


      var component = this;
      $(".filter-terrain a").removeClass("filter-btn-selected")

      if (this.state.selected === e.target.value) {
          this.props.updateFilter({terrain: null})
          return;
      }

      e.target.classList.add("filter-btn-selected");
      this.setState({selected: e.target.value})
      //SEND TO PARENT HERE
      this.props.updateFilter({terrain: e.target.value})


    },


   
    render: function() { 

  
      
       return (
          <div>
            <p> Terrain </p>
            <a href="#" className="btn filter-btn btn-two" value="hilly" onClick={this.setTerrain}> Hilly </a>
            <a href="#" className="btn filter-btn btn-two" value="flat" onClick={this.setTerrain}> Flat </a>
          </div>
        );
  
  
      }
});

module.exports=Terrain