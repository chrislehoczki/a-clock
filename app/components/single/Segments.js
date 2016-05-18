var React = require('react');
var Segment = require("./Segment.js")
var Controls = require("./Controls.js");

var Segments = React.createClass({

    getInitialState: function() {
        return {type: "running"};
    },

    showRunners: function() {
        this.setState({type: "running"});
    },

    showRiders: function() {
        this.setState({type: "riding"});
    },

    render: function() {    


       return (

            <div>
                <Controls showRiders={this.showRiders} showRunners={this.showRunners} selected={this.state.type} />

                {this.state.type === "running" ?
                    <div className="row single-runners-segments">
                        {this.props.runningSegments.map(function(segment) {
                            return <Segment key={segment.id} data={segment} />
                        })}
                    </div>
                    :null}
                {this.state.type === "riding" ?
                         
                    <div className="row single-riders-segments">
                        {this.props.ridingSegments.map(function(segment) {
                            return <Segment key={segment.id} data={segment} />
                        })}
                    </div>   
                    :null}
                    
            </div>
        );
  
  
      }
});

module.exports=Segments