var https = require('https'); //makes it possible to do http requests for api
var express = require('express');
var concat = require('concat-stream');
var app = express();

require('dotenv').config(); //makes apikey invisible

var apikey = process.env.APIKEY;

app.set('view engine', 'ejs'); //render all html with ejs

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/search/:query?', function (req, res) {
  var query = req.params.query; //takes parameters, and whatever is set as query
  load(query, callback); //calls function load, gives the query and calls function callback

  function callback(data) {
    res.render('search', {data: data, query: query}); // renders search with an object, these properties are now accessible in index.ejs
  }
});

app.get('/:detail', function (req, res) {
  res.render('detail');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

function load(query, callback) {
  var url = `https://www.rijksmuseum.nl/api/nl/collection?key=${apikey}&q=&ps=50&format=json&imageonly=true&q=${query}`;
  https.get(url, function(res) {
    res.pipe(concat(onfinish));
  });

  function onfinish(buffer) {
    callback(JSON.parse(buffer));
  }
}
