const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost/testdb");

const user = new User({name: "kim", age: 18}); // Local copy
user.save().then(() => console.log("User Saved")); // Saved to database