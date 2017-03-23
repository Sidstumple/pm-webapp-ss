# Performance Matters Web App from Scratch Server Side Version
A server-side version of my webapp from scratch.

## Usage
- Clone this repository
- Navigate to the directory in your terminal
- Install the dependencies with:
```
npm install
```

- Run this app 
```
node app.js
```

- Use the app at
http://localhost:3000/search

## How it works
This app uses [Express](https://www.npmjs.com/package/express) to handle routing. 
```
app.get('/', function (req, res) {
  res.render('index'); //renders index.ejs
});
```
`app.get` checks the path that is declared (`'/'`) and a function handles the request and response, on response the function renders the html page.

[Embedded JS Templates (EJS)](https://www.npmjs.com/package/ejs) is used to render all html partials, it also allows me to send data from my JS files to my HTML files.
```
res.render('search', {data: data, query: query});
// search is the ejs file, data and query are usable in the HTML files.
```

To handle API requests I use [Request](https://www.npmjs.com/package/request).
```
request(url, function(error, response, body){
  var data = JSON.parse(body); 
  res.render('search', {data: data, query: query});
})
```

The search input has an html attribute `name="q"` (q is for query), when the search page is rendered it requests that the value that is in the input field with `name="q"` is put in the parameters of the url. I can use this variable now to add the user query to the API url and request the according data.
```
var query = req.param('q');
```
