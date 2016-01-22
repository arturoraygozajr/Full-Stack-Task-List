'use strict'

var PORT = 4000;

// bring in dependencies / libraries
var http = require('http');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

// configure general middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// route definitions
app.get('/', function(req, res) {
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
});

app.get('/tasks', function(req, res) {
  fs.readFile('./tasks.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data);
    res.send(arr);
  });
});

app.post('/tasks/add', function(req, res) {
  fs.readFile('./tasks.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var taskList = JSON.parse(data);
    var newTask = req.body;
    taskList.push(newTask);
    
    fs.writeFile('./tasks.json', JSON.stringify(taskList), function(err) {
      if(err) return res.status(400).send(err);
      res.send("task added\n");
    });
  });
});


// spin up server
app.listen(PORT, function() {
  console.log('Express server has ears on port', PORT)
});