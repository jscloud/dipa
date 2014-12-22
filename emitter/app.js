var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);
var port  = 8080;

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


app.get('/', function(req, res)
{
  res.send('Emitter OK !');
});


app.route('/send/:username')

  .all(function(req, res, next) 
  {
    console.log('/Send method is called');
    console.log(req.method);
    console.log(req.params);
    next();
  })

  .post(jsonParser, function(req, res, next) 
  {
      if (!req.body) 
      {
        console.log('Bad request');
        return res.sendStatus(400);
      }

      console.log(req.body);

      var bodyObj   = req.body;
      var uriParams = req.params;

      io.emit('send' + "_" + uriParams.username, bodyObj);

      var response = {
        result: 'ok'
      };

      res.json(response);
  })

io.on('connection', function (socket) {

  console.log('New connection');

  socket.on('send_data', function (data) {
	console.log(data);
	io.emit(data.username, data.text);
  });

  socket.on('client_connection', function (username) {
        io.emit('new_client', username);
  });

});

http.listen(port, function()
{
  console.log('Emitter running on *: ' + port);
});
