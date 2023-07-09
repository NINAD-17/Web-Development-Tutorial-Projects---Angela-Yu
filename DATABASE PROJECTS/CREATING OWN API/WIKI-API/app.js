const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const ejs = require ("ejs");

const app = express ();

app.use (bodyParser.urlencoded ({extended: true}));
app.use (express.static ("public"));

app.set ("view engine", "ejs");

// MongoDB
mongoose.set ("strictQuery", true);
mongoose.connect ("mongodb://127.0.0.1:27017/wikiDB");

// Schema for Articles
const articleSchema = new mongoose.Schema ({
    title: String, 
    content: String
}); 

// Model (collection name in singular form)
const Article = mongoose.model ("Article", articleSchema);

// --------------------{ Request Targeting all Articles }-----------------------------
app.route ("/articles")

.get((req, res) => {
    Article.find ({}, (err, foundArticles) => {  // To find all documents inside Articles model
        if (!err) 
            res.send (foundArticles);
        else 
            res.send (err);
    });
})

.post((req, res) => {
    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save ((err) => {
        if (!err) 
            res.send ("Successfully added new article!");
        else 
            res.send (err);
    });
})

.delete((req, res) => {
    Article.deleteMany ({}, (err) => {
        if (!err) 
            res.send ("Successfully deleted all articles!");
        else 
            res.send (err);
    });
});

// --------------------{ Request Targeting a specific Article }-----------------------------
app.route ("/articles/:title")

.get ((req, res) => {
    const articleTitle = req.params.title;
    
    Article.findOne ({title: articleTitle}, (err, article) => {
        if (!err) 
            res.send (article);
        else 
            res.send ("No articles matching that title was found!");
    })
})

.put ((req, res) => {
    const articleTitle = req.params.title;

    Article.replaceOne (
        {title: articleTitle},
        {title: req.body.title, content: req.body.content},
        (err) => {
            if (!err) {
                console.log ("Successfuly updated article");
                res.send ("Successfuly updated article");
            } else {
                res.send (err);
            }
        }
    )
})

.patch ((req, res) => {
    const articleTitle = req.params.title;

    Article.updateOne (
        {title: articleTitle},
        {$set: req.body},
        (err) => {
            if (!err) {
                res.send ("Successfully updated!");
            } else {
                res.send (err);
            }
        }
    )
})

.patch ((req, res) => {

})

.delete ((req, res) => {
    const articleTitle = req.params.title;

    Article.deleteOne ({title: articleTitle}, (err) => {
        if (!err) 
            res.send ("Successfully deleted!");
        else 
            res.send (err);
    })
})


app.listen (3000, () => console.log ("Server listening on port 3000."));