var express = require('express');
var app = express();
var path = require('path');

var port = 443;

// middleware
app.use(express.static(__dirname + '/public'));

// index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
});

// chapters.html
app.get('/chapters', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/chapters.html'));
});

// test.html
app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/test.html'));
});

// test.html
app.get('/thumbnail', function(req, res) {
    res.sendFile(path.join(__dirname + '/view/HHUMediathek_Startseite.htm'));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});