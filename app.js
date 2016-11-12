var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./connection.js');
var Persona = require('./models/persona.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/api',function(req,res){
  Persona.obtenerPersonas(res);
});

app.post('/api', function(req,res){
  var body = req.body;
  if(body.desition === 0){
    Persona.guardarPersona(body,res);
  }
  else if(body.desition === 1){
    Persona.eliminarPersona(body,res);
  }
  else if(body.desition === null || body.desition === undefined){
    res.send('Desition Expected');
  }
});




module.exports = app;
