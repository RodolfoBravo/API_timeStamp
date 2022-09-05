// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  var date = new Date();
  //console.log(date);
  var dateGMT = date.toUTCString();
  var dateUnix = date.getTime();

 var responde = {'unix':dateUnix,'utc':dateGMT};
  res.json(responde);
});

app.get("/api/:date_string", function (req, res) {
  const { date_string } = req.params;
  console.log(date_string);
  console.log(date_string.indexOf('GMT'));
  var letras="abcdefghyjklmnñopqrstuvwxyz";
  function have_letters(text){
   text = text.toLowerCase();
    if(date_string.indexOf('GMT')==-1)
   {for(i=0; i<text.length; i++){
      if (letras.indexOf(text.charAt(i),0)!=-1){
         return 1;
      }
   }}
   
   return 0;
}
if(have_letters(date_string) ==0) {
  var date = new Date(date_string); 
  var dateGMT = date.toUTCString();
  var dateUnix = date.getTime();
  if (dateGMT === 'Invalid Date'){
    date = new Date(parseInt(date_string,10));
    var dateGMT = date.toUTCString();
    var dateUnix = date.getTime();
  } 
  var responde = {'unix':dateUnix,'utc':dateGMT};
} else {
    var responde = {'error':'Invalid Date'}
  }
  res.json(responde);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
