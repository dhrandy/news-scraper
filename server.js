var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
const mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();

//middleware
app.use(logger("dev")); //morgan
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set('view engine', '.handlebars');
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/news2");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news2";
useNewUrlParser: true 
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Routes
app.get("/scrape", function(req, res) {
    axios.get("https://gizmodo.com/tag/home-automation").then(function(response) {
        var $ = cheerio.load(response.data);
        // var result=0;

        $(".headline").each(function(i, element) {

            result = {};

            // result.headlines = $(this).find("a").text()
            result.headlines = $(this).children().text().trim();
            result.url = $(this).children().attr("href");
            // result.excerpt = $(".entry-summary").children().substring(0, 50)


            db.Article //Creates new articles
                .create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        res.redirect('/')
            // res.send("Click for scraped results " + `<a href = / >HOME</a>`);
    });
});
//Get route
app.get("/", function(req, res) {
    // res.send("I did a get route to here, but point this to the index.hbs when you get it working");
    db.Article
        .find({})
        .then(function(dbArticle) {
            res.render("index", {
                Articles: dbArticle
            })
        })
        .catch(function(err) {
            res.json(err);
        })

});
app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json({
                Articles: dbArticle
            });
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({
            _id: req.params.id
        })
        .populate("notes")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/articles/:id", function(req, res) {
    console.log("Route Working")
    db.Note.create(req.body)
        .then(function(dbNotes) {
            console.log("Notes " + dbNotes)
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNotes._id
            }, {
                new: true
            });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});
//Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});