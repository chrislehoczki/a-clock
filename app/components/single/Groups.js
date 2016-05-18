var React = require('react');

var Group = require("./Group.js")
var Controls = require("./Controls.js");

var Main = React.createClass({


    getInitialState: function() {
        return {
            type: "running",
            runningGroups: [],
            ridingGroups: []
        };
    },

    showRunningGroups: function() {
        this.setState({type: "running"})
    },

    showRidingGroups: function() {
        this.setState({type: "riding"})
    },


    componentDidMount: function() {

        var url = "/api/fbookgroups"

        var city = this.props.city.city.name;
        var country = this.props.city.country.name;
        
        var runningQuery = "?query=" + city + " running";
        var ridingQuery = "?query=" + city + " cycling";

        //FIRE ONE FOR RUNNING
        var component = this;

        $.get(url + runningQuery, function(data) {
            data = JSON.parse(data);
            component.setState({runningGroups: data.data});
            
        });

        //FIRE ONE FOR RIDING

        $.get(url + ridingQuery, function(data) {
            data = JSON.parse(data);
            component.setState({ridingGroups: data.data});
        });

    },

   
    render: function() {   

       return (

            <div>
              <Controls showRiders={this.showRidingGroups} showRunners={this.showRunningGroups} selected={this.state.type} />
               {this.state.type === "running" ?
                this.state.runningGroups.map(function(group) {
                return <Group key={group.id} group={group} />
               })
               :null}

               {this.state.type === "riding" ?
               this.state.ridingGroups.map(function(group) {
                return <Group key={group.id} group={group} />
               })
               :null}

            </div>
        );
  
  
      }
});

module.exports=Main