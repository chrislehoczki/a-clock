var React = require('react');

var UserForm = require("./UserForm.js");
var Tip = require("./Tip.js");
var Controls = require("./Controls.js");

var Tips = React.createClass({

    getInitialState: function() {

        return {
            ridingTips: [],
            runningTips: [],
            type: "running"
        };

    },

    componentDidMount: function() {
        
        this.getTips();
    },

    getTips: function() {
        var component = this;
        console.log("trying to update")
        var url = "/api/tips?slug=" + this.props.slug
        $.get(url, function(data) {
            console.log(data)
            component.setState({runningTips: data.running.tips, ridingTips: data.riding.tips})
        });

    },
 
    showRunningTips: function() {
        this.setState({type: "running"})
    },

    showRidingTips: function() {
        this.setState({type: "riding"})
    },

    render: function() {    
      
       return (

            <div> 
                <Controls showRiders={this.showRidingTips} showRunners={this.showRunningTips} selected={this.state.type} />
                
                <UserForm update={this.getTips} slug={this.props.slug} activity={this.state.type} />

                {this.state.type === "riding" ?
                <div className="riding-tips">
                    {this.state.ridingTips.map(function(tip) {
                        return <Tip key={tip.tip + tip.date} data={tip} />
                    })}
                </div> 
                : null}

                {this.state.type === "running" ?
                <div className="running-tips">
                    {this.state.runningTips.map(function(tip) {
                        return <Tip key={tip.tip + tip.date} data={tip} />
                    })}
                </div> : null }

                
            </div>
        );
  
  
      }
});

module.exports=Tips