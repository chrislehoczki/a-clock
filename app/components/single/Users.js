var React = require('react');

var User = require("./User.js")

var Users = React.createClass({

    getInitialState: function() {
        return {type: "running"};
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

    render: function() {    


       return (

            <div>
                <button onClick={this.showRunners}>Running</button>
                <button onClick={this.showRiders}>Riding</button>

                {this.state.type === "running" ?
                    <div className="single-runners row">
                        {this.props.runners.map(function(runner) {
                            return <User key={runner.id} athlete={runner} />
                        })}
                    </div>
                    :null}
                {this.state.type === "riding" ?
                         
                    <div className="single-riders row">
                        {this.props.riders.map(function(rider) {
                            return <User key={rider.id} athlete={rider} />
                        })}
                    </div>   
                    :null}
                    
            </div>
        );
  
  
      }
});

module.exports=Users