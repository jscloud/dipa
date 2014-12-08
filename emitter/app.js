var express = require('express')
var app = express()

app.get('/', function (req, res) {
	console.log('New request');
	res.send('Emitter OK!')
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Emitter listening at http://%s:%s', host, port)
})
