var express = require('express');
var request = require('request');

require('dotenv').config(); //makes apikey invisible

var app = express();

app.use(express.static('static'));
app.set('view engine', 'ejs'); //render all html via ejs

// for the API url:
var startUrl = 'https://www.rijksmuseum.nl/api/nl/collection';
var apikey = process.env.APIKEY; //invisible apiKey

app.get('/', function (req, res) {
  res.render('index'); //renders index.ejs
});

app.get('/search/:query?', function (req, res) {
      var query = req.param('q');
      var url = `${startUrl}?key=${apikey}&imgonly=true&ps=6&format=json&q=${query}`;
      request(url, function(error, response, body){
        var data = JSON.parse(body);
        res.render('search', {data: data, query: query}); // renders search with an object, these properties are now accessible in index.ejs
      })
});

app.get('/detail/:id', function (req, res) {
  var id = req.params.id;

  var url = `${startUrl}/${id}?key=${apikey}&format=json`;
  request(url, function(error, response, body){
    var detail = JSON.parse(body);
    res.render('detail', {detail: detail});
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
