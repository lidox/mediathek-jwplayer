var express = require('express');
var app = express();
var path = require('path');

var port = 1337;

// middleware
app.use(express.static(__dirname + '/public'));

// index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});