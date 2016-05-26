var React = require('react');

var User = require("./User.js");
var Controls = require("./Controls.js");

var Users = React.createClass({

    getInitialState: function() {
        return {type: "riding"};
    },

    showRunners: function() {
        this.setState({type: "running"})
        setTimeout(function() {
            $('.athlete img').tooltip()
        },500)
    },

    showRiders: function() {
        this.setState({type: "riding"})
        setTimeout(function() {
            $('.athlete img').tooltip()
        },500)
    },

    componentDidMount: function() {
        this.showRunners()
    },

    render: function() {    


       return (

            <div>
                <Controls showRiders={this.showRiders} showRunners={this.showRunners} selected={this.state.type} />

                {this.state.type === "running" ?
                    <div className="single-runners row">
                        {this.props.runners.map(function(runner, i) {
                            return <User key={"runner" + runner.id + i} athlete={runner} />
                        })}
                    </div>
                    :null}
                {this.state.type === "riding" ?
                         
                    <div className="single-riders row">
                        {this.props.riders.map(function(rider, i) {
                            return <User key={"rider" + rider.id + i} athlete={rider} />
                        })}
                    </div>   
                    :null}
                    
            </div>
        );
  
  
      }
});

module.exports=Users