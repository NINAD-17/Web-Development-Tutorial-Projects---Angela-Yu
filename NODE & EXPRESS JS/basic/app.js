const express = require("express");

const app = express();

app.get("/", function(req, res) {
    res.send("<h1>Thanks for calling me(server) :)</h1>");
});

app.get("/contact", function(req, res) {
    res.send("<p>contact me at theninad17@gmail.com</p>");
});

app.get("/about", function(req, res) {
    res.send("<h3>Anneoung! naneun bangtan sonyeondan paen ninadeu ibnida.</h3>")
})

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});