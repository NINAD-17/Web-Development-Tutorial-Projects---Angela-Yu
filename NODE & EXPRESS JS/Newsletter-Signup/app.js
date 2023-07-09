require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/" + process.env.LIST;
  const options = {
    method: "POST",
    auth: "Ninad17:" + process.env.API_KEY + "-us21"
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode === 200) {
      res.send("Successfully subscribed.");
    }
    else {
      res.send("There was an error with signing up! Please try again.");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.listen(3000, function() {
  console.log("Server is running on port 3000 :)");
});


