const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

//Model
//'user' collection (table)
module.exports = mongoose.model("User", userSchema);