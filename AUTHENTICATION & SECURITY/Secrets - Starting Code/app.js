//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// INitialize session
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// Initiallize passport
app.use(passport.initialize());
app.use(passport.session()); // tell our app to Use passport to setup our session

// Initialize mongodb
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/userDB");


// user Schema
const userSchema = new mongoose.Schema({ // this is object created from mongoose schema class
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose); // use to hash and salt passport and save users in mongodb


// model or table
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/secrets", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("secrets");  
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.logout(err => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
})

// Register users 
app.post("/register", (req, res) => {
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets")
            })
        }
    })

    // const newUser = new User({
    //     email: req.body.username,
    //     password: md5(req.body.password)
    // });

    // // Save new user in DB
    // try {
    //     newUser.save();
    //     res.render("secrets");
    // } catch(err) {
    //     console.log(err);
    // }
});

app.post("/login", async (req, res) => {
    const user = new User ({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            });
        }
    })
    // const userName = req.body.username;
    // const password = md5(req.body.password);

    // try {
    //     const foundUser = await User.findOne({email: userName});
    //     if(foundUser.password === password) {
    //         res.render("secrets");
    //     }
    // } catch(err) {
    //     console.log(err);
    // }
});

app.listen(3000, () => console.log("Server started on port 3000 .|..|."));