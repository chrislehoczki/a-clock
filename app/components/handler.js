'use strict';


var React = require('react');
var ReactDOM = require("react-dom");

var Main = require("./Main.js");
var SideBar = require("./Sidebar.js");
var Single = require("./Single.js");
var Header = require("./Header.js");
var UserHeader = require("./UserHeader.js");
//GET PROPS

var data = JSON.parse(document.getElementById("data").innerHTML);

var user = JSON.parse(document.getElementById("user").innerHTML);

var headerHolder = document.getElementById("header-react-holder");
var sidebarHolder = document.getElementById("sidebar-react-holder");
var mainHolder = document.getElementById("main-react-holder");
var singleHolder = document.getElementById("single-react-holder");

if (user !== "none") {
	ReactDOM.render(<UserHeader user={user}/>, headerHolder);
}
else {
	ReactDOM.render(<Header />, headerHolder);
}

ReactDOM.render(<SideBar data={data}/>, sidebarHolder);

if (mainHolder) {
	ReactDOM.render(<Main data={data}/>, mainHolder);
}
else if (singleHolder) {
	ReactDOM.render(<Single data={data} />, singleHolder);
}





