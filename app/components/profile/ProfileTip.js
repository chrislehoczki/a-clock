var React = require('react');


var ProfileTip= React.createClass({

    getInitialState: function() {
      return {

        }

    },

    componentDidMount: function() {

    },

    removeTip: function() {

      var data = {slug: this.props.tip.slug, tip: this.props.tip}
      var component = this;

      $.ajax({
        url: '/api/tips',
        data: data,
        type: 'DELETE',
        success: function(result) {
            console.log(data)
           component.props.getUser();
        }
    });

    },


    render: function() {
      console.log(this.props.tip)
      
       return (
      <div>
         <p> {this.props.date.toDateString() + " Type: " + this.props.tip.activity} </p> <p> {this.props.tip.tip} </p> 
        <button onClick={this.removeTip} className="btn main-bth">Remove</button>
      </div>
        );
  
  
      }
});

module.exports=ProfileTip;

