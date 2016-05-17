var React = require('react');



var Tips = React.createClass({


    render: function() {    

        //CONVERT DATE

        var date = new Date(Date.parse(this.props.data.date));
        date = date.toDateString();
      
       return (

            <div> 
                <p> {this.props.data.tip} </p>
                <p> {this.props.data.user} </p>
                <p> {date} </p>
            </div>
        );
  
  
      }
});

module.exports=Tips