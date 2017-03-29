var https = require('https');
var concat = require('concat-stream');

require('dotenv').config();

// for the API url:
var startUrl = 'https://www.rijksmuseum.nl/api/nl/collection';
var apikey = 'epHseGj4';
var input = document.getElementById('user-input-field');
var query = input.value;
var url = `${startUrl}?key=${apikey}&ps=6&format=json&q=${query}`;
var article = document.getElementById('add-content');

input.addEventListener('input', function(){
  search();
});

function search(){
  // load(callback, url); //calls function load, gives the query and calls function callback
  console.log(query);
  var html = '';
  function callback(data) {
    data.artObjects.map(function(obj){ //use the variable data to map (loop through and apply a function) the array artObjects, this is the array that contains all the properties of the API I want to use.
      console.log(obj);
      if (obj.webImage !== null) { //check if an image is available when webImage is not equal to null it contains a url to the image
        html =
          `<div class="media-item" id=${obj.objectNumber}>
            <h1> <a href="/detail/${obj.objectNumber}">${obj.principalOrFirstMaker}</a> </h1>
            <p>${obj.title}</p>
            <img src="${obj.webImage.url}" alt="${obj.title}">
          </div>`
        }
    article.innerHTML = html;
    });
   }
 }

 function load(callback, url) {
   console.log(url);
   https.get(url, function(res) {
     res.pipe(concat(onfinish));
   });

   function onfinish(buffer) {
     callback(JSON.parse(buffer));
   }
 }
