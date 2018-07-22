# Home Automation News Scraper
Home Automation News Scaper is web application that scrapes news from Gizmodo's home automation web site. I made the app with Mongoose and Cheerio technologies among other technologies.

* Whenever a user runs the app on the local server or on the Heroku app link, article headlines, the article link, and the article snippet are scraped from https://gizmodo.com/tag/home-automation's website. 
* I used cheerio to  grab and scrape https://gizmodo.com/tag/home-automation's DOM elements. Mongoose was used to save the scraped data to our database (mongodb.)
* The add note button allows user to add notes on an article. All notes are saved to our mongodb database. 

## See it live here: https://dhrandy-scrape.herokuapp.com/

This app was made using cheerio to serve  as the ORM to simplify the database interactions.

### Pre-requisites

* Install Node.js. visit https://nodejs.org/en/ and download

### Technologies used

*Node.js
*Express.js
*Bootstrap V3.7

### Getting Started
This app is built with the following npm packages:

* express 
* express-handlebars
* body-parser
* cheerio 
* mongoose 
* morgan
* request

Type `npm install` in the command line to install all the dependencies located within package.json

## Default test (included in package.json file)
In order to connect to the scraper web app on the local server, type the following in the command line:

 `node server.js`

The user will also be notified in the command line interface on which PORT its connected on.

`localhost:port/scrape` will scrape the Gizmodo's home automation website

`localhost:port/articles` will display all the scraped articles from https://gizmodo.com/tag/home-automation


