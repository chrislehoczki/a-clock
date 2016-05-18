var React = require('react');

var UserForm = require("./UserForm.js")
var Tip = require("./Tip.js")

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
        
        var url = "/api/tips?slug=" + this.props.slug
        $.get(url, function(data) {
            component.setState({runningTips: data.running.tips, ridingTips: data.riding.tips})
        });

    },
 
    showRunningGroups: function() {
        this.setState({type: "running"})
    },

    showRidingGroups: function() {
        this.setState({type: "riding"})
    },

    render: function() {    
      
       return (

            <div> 
                <button onClick={this.showRunningGroups}>Running</button>
                <button onClick={this.showRidingGroups}>Riding</button>
                

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

                <UserForm update={this.getTips} slug={this.props.slug} type={"tips"} />
            </div>
        );
  
  
      }
});

module.exports=Tips