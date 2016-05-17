var React = require('react');

var UserForm = require("./UserForm.js")

var Description = React.createClass({

	getInitialState: function() {

		return {
			text: this.props.text
		}
	},

	update: function() {
		var component = this;
		console.log("being called");
		var url = "/api/description" + "?slug=" + this.props.slug;
		$.get(url, function(data) {
			console.log("the new description")
			console.log(data);
			component.setState({text: data.description.description})
		});
	},
 
    render: function() {    
    	console.log("rendering")
      	console.log(this.state)
       return (

            <div> 
            	{this.state.text ? <h3> {this.state.text} </h3> : <UserForm update={this.update} type={"description"} slug={this.props.slug} />}
            </div>
        );
  
  
      }
});

module.exports=Description