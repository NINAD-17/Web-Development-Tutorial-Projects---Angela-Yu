const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmiCalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res) {
  var height = Number(req.body.height);
  var weight = Number(req.body.weight);
  var result = (weight/Math.pow(height, 2));
  res.send("Your BMI is: " + result);
})

app.post("/", function(req, res) {
  var num1 = parseFloat(req.body.num1);
  var num2 = parseFloat(req.body.num2);
  var result = num1 + num2;
  res.send("The result of calculation is: " + result);
});

app.listen(3000, function() {
  console.log("Sever is running on port 3000.");
});
