var fs = require("fs")

var cityMethods = require("./description.js")

var city = JSON.parse(fs.readFileSync("../../data/final/cities.json"))[0]

var cityMethods = new cityMethods(city)
console.log(cityMethods)

