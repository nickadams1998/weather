const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // Query by city ID instead of zip
    const cityId = "2172797"; // Cairns, Australia
    console.log("City ID: ", cityId);
    
    //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
    const units = "imperial";
    const mySecret = process.env['MySecret'];
    const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityId +  "&units=" + units + "&APPID=" + mySecret;
    
    // this gets the data from Open Weather API
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const cloudiness = weatherData.clouds.all;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + city + "<h1>");
          res.write("<h2>Humidity: " + humidity + "%<h2>");
          res.write("<h2>Wind Speed: " + windSpeed + "mph<h2>");
          res.write("<h2>Wind Direction: " + windDirection + "°<h2>");
          res.write("<h2>Cloudiness: " + cloudiness + "%<h2>");
            res.write("<h2>The Temperature in " + city + " is " + temp + " Degrees Fahrenheit<h2>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});



//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
