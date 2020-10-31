// server.js
// This is where your node app starts

//load the 'express' module which makes writing web servers easy
const express = require("express");
const app = express();
const lodash = require("lodash");
const cors = require("cors");
const port = 3001;

//load the quotes JSON
const quotes = require("./quotes.json");
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send(
    "Hadiyah's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...
app.get("/", function (request, response) {
  response.send(
    "Welcome to Hadiyah's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/random", function (request, response) {
  response.send(pickFromArray(quotes));
});
app.get("/quotes/lodash-random", function (request, response) {
  response.send(lodash.sample(quotes));
});

//IMPLEMENTING SEARCH
app.get("/quotes/search", function (request, response) {
  let searchValue = request.query.term;
  let searchedQuote = quotes.filter(
    (quoteObject) =>
      quoteObject.quote.toLowerCase().includes(searchValue.toLowerCase()) ||
      quoteObject.author.toLowerCase().includes(searchValue.toLowerCase())
  );
  response.json(searchedQuote);
});

//ECHO PARAMETER
app.get("/echo", function (request, response) {
  let searchValue = request.query.word;
  response.send(searchValue);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(port)
  console.log("Your app is listening on port");

