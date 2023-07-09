const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var items = ["Buy food", "Cook food", "Eat food"];
var workItems = [];

app.get("/", function(req, res) {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("lists", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.get("/work", function(req, res) {
  res.render("lists", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  console.log(req.body);
  let item = req.body.newItem;

  if(req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is running at port 3000 .|..|.");
});
