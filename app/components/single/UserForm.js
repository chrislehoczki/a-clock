var React = require('react');

var Main = React.createClass({

    getInitialState: function() {

        return {
            message: "",
            activityChosen: false,
            userMsg: "",
            msgClass: "alert alert-warning"
        }


    },

    postData: function() {
        var component = this;
        var body;
        var url;


        if (!this.state.activityChosen && this.props.type === "tips") {
            this.setState({userMsg: "You must choose an activity before posting a tip."})
            return;
        }

        if (this.props.type === "description") {
            body = {slug: this.props.slug, description: this.state.data}
            url = "/api/description"
        }
        else {
            body = {slug: this.props.slug, tip: this.state.data, activity: this.state.activity}
            url = "/api/tips"
        }

        $.post(url, body, function(data) {

                component.props.type === "description" ? component.removeForm() : component.setState({msgClass: "alert alert-success", userMsg: "Great, we received it!"})
                component.props.update();
        });
        
       
    },

    removeForm: function() {
        $(".single-form").animate({
            left: "2000px",
            opacity: 0,
            display: "none"
        }, 1000);
    },


    changeData: function(e) {
        this.setState({data: e.target.value})
    },

    addActivity: function(e) {

        this.setState({
              activity: e.target.value.toLowerCase(),
              activityChosen: true
        })
    },


    componentDidMount: function() {

        if (this.props.type === "description") {
            this.setState({message: "Add a description"})
        }
        else {
            this.setState({message: "Add a tip"})
        }

    },
   
    render: function() {    
      
       return (

            <div className="single-form"> 
            <p>{this.state.message}</p>
        
            <textarea value={this.state.data} onChange={this.changeData} className="form-control" />

            {this.props.type !== "description" ? 
                <div>
                <input type="radio" name="activity" value="Running" ref="activity" onChange={this.addActivity}/>Running
                <input type="radio" name="activity" value="Riding"  ref="activity" onChange={this.addActivity} />Riding
                </div>
            : null}
            <button onClick={this.postData} className="btn btn-primary" type="submit">Submit</button>

            {this.state.userMsg !== "" ?
            <p className={this.state.msgClass}>{this.state.userMsg}</p>
            : null}
            
            </div>
        );
  
  
      }
});

module.exports=Main