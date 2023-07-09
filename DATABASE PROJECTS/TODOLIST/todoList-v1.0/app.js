const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

let items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("lists", {listTitle: day, newTask: items});
});

app.post("/", function(req, res) {
  console.log(req.body.list);
  item = req.body.newItem;
  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("lists", {listTitle: "Work List", newTask: workItems});
});

// app.post("/work", function(req, res) {
//   let item = res.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is started on port 3000 .|..|.");
});
