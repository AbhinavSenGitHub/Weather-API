const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
require('dotenv').config();

const app = express();
app.use(express.static("public"));   //to get our css file on localhost
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function(){
  console.log("Surver is started on port 3000");
})

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  })
app.post("/", function(req, res){
  // console.log("Post request is made");
  // console.log(req.body.cityName);

  const quary = req.body.cityName;
  const apikey = process.env.apikey;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + quary + "&appid=" + apikey + "&units=" + unit;

  https.get(url, function(response){
    // console.log(response.statusCode);

    response.on("data", function(data){        //response.on() is used to get specific data
      // console.log(data)
      var weatherData = JSON.parse(data);      //JSON.parse(data)  it convert json object to javaScript object
      console.log(weatherData);
      var temp = weatherData.main.temp;
      var windSpeed = weatherData.wind.speed;
      var humiditiy = weatherData.main.humidity;
      console.log(windSpeed);
      var weatherDiscription = weatherData.weather[0].description;
      // console.log(weatherDiscription);
      res.write("<h1>Weather discription of " + quary + " is " + weatherDiscription + " </h1>");
      res.write("<h1>The temprature in " + quary + " is " + temp + " degree centigrate</h1>");
      res.write("<h2>Windspeed is " + windSpeed);
      res.write("<h2>Humiditiy  is " + humiditiy);

      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + iconURL + ">");
      res.send();




      // var object_Name = {
      //   name: "Abhinav Sen",
      //   age: 20,
      //   food: "Steam Momos"
      // }
      // console.log(JSON.stringify(object_Name));   //JSON.stringify(object) is convert javaScript object to JSON objects
    })

  })
  // res.send("Surver is running on port 3000.")    // only one res.send() is allow to get method
})
