var React = require('react');

var CityGuideInfo = require("../city-guides/CityGuideInfo.js")
var Guide = require("../city-guides/Guide.js")

var Main = React.createClass({


    getInitialState: function() {
        return {
            runningGroups: [],
            ridingGroups: [],
            showInfo: false
        };
    },

    showCityGuideInfo: function()  {
      console.log("being called")
      this.setState({showInfo: true})
    },

    hideCityGuideInfo: function() {
      this.setState({showInfo: false})

    },

   
    render: function() {   

       return (

            <div>
              
              <button className="btn main-btn pull-right" onClick={this.showCityGuideInfo}> Want to become a guide? </button>
              {this.props.data.guides.length > 0 ?
                this.props.data.guides.map(function(guide) {
                return <Guide data={guide}/>
              })
                : <p> We have no city guides for this city, why not consider being one? </p>
              }
              

               <CityGuideInfo showMessage={this.state.showInfo} hideMessage={this.hideCityGuideInfo} data={this.props.data} />
               <div style={{clear: "both"}}></div>
            </div>
        );
  
  
      }
});

module.exports=Main