// const express = require("express");
// const app = express();
// app.get("/", function(request, response){
//   response.send("<h1>Hello :)</h1>");
// })
// app.listen(3000, function(){
//   console.log("Server started on port 3000 :)");
// });

const express = require("express");
const app = express();
app.get("/", function(req, res) {
  res.send("<strong>Hello :)</strong>");
});
app.get("/contact", function(req, res){
  res.send("Contact me at: theninad17@gmail.com");
});

app.get("/about", function(req, res) {
  res.send("This website is owned by The great Ninad who is future billioneir.");
});

app.get("/hobbies", function(req, res) {
  res.send("listen BTS and Kpop and watch Kdramas.");
});
app.listen(3000, function() {
  console.log("Server started on port 3000 :)");
});
