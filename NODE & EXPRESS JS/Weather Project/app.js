require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.send("<h1>Server is up and running :)</h1>");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      console.log(data);
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const description = weatherData.weather[0].description;
      // console.log(description);
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.setHeader("Content-Type", "text/html");
      res.write("<h3>The Weather is currently " + description + ".</h3>");
      res.write("<h1>The temparature in "+ query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src="+iconUrl+">");
      res.send();
    });
  });
});




app.listen(3000, function() {
  console.log("Server is running on port 3000 :)");
});
