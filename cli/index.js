#!/usr/bin/env node

var program = require('commander');
var http    = require('http');
var fs      = require('fs');

var keyPath = process.env.HOME + '/.pastingKey'; 
var usr, pwd, consoleKey;

program
  .version('1.0.0')
  .usage('[options]')
  .option('-u, --username [username]', 'Configure your pasting username')
  .option('-p, --password [password]', 'Configure your pasting password')
  .parse(process.argv);

if (program.username && program.password) 
{
  usr = program.username;
  pwd = program.password;

  var options = {
    hostname: 'api.pasting.io',
    port: 80,
    path: '/createConsoleKey',
    method: 'POST'
  };

  var bodyData = {
    username: usr,
    pwd: pwd
  };

  var req = http.request(options, function(res) 
  {
    res.setEncoding('utf8');
    res.on('data', function (chunk) 
    {
      responseData = JSON.parse(chunk);
      if (responseData.st == "ok") {
        buffer = new Buffer(responseData.console_key);
        fs.open(keyPath, 'w', function(err, fd) {
            if (err) {
                throw 'Error 1: Pasting.io config file';
            } else {
                fs.write(fd, buffer, 0, buffer.length, null, function(err) {
                    if (err) throw 'Error 2: Pasting.io config file';
                    fs.close(fd, function() {
                        console.log('Pasting.io-cli configuration was established successfully');
                    })
                });
            }
        });
      } else {
        console.log('Error: Pasting.io - ' + responseData.msg);
      }
    });
  });

  req.on('error', function(e) {
    console.log('Error: Pasting.io - ' + e.message);
  });

  req.write(JSON.stringify(bodyData));
  req.end();

} else {

  fs.readFile(keyPath, 'utf8', function(err, pastingKeyData) 
  {
    var stdinData = '' ; 
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function(chunk) {
         stdinData += chunk;
    })
    process.stdin.on('end', function(stream) 
    {
        if (stream != '' && stream != '\n') { 
          var bodyData = {
            consoleKey: pastingKeyData,
            text: stdinData
          };

          var options = {
            hostname: 'api.pasting.io',
            port: 80,
            path: '/createFromConsole',
            method: 'POST'
          };

          var req = http.request(options, function(res) 
          {
            res.setEncoding('utf8');
            res.on('data', function (data) 
            {
              responseData = JSON.parse(data);
              if (responseData.st == "ok") {
                process.stdout.write('Pasting created successfully! \n');
                process.stdout.write('http://pasting.io/' + responseData.username + "/" + responseData.documentId);
              } else {
                process.stdout.write('Error: Pasting.io - ' + responseData.msg);
              }
            });
          });

          req.on('error', function(e) {
            process.stdout.write('Error: Pasting.io - ' + e.message);
          });

          req.write(JSON.stringify(bodyData));
          req.end();

        } else {
          process.stdout.write('Usage: [yourBashCommand] | pasting ');
        }

      // process.stdout.write(stream);
    });
  });

}
