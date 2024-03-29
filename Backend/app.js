let fs = require('fs'),
    http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
    fileUpload = require('express-fileupload');


//provjera produkcije
let isProduction = process.env.NODE_ENV === 'production';

//glavni express process
let app = express();


//koristenje corsa
app.use(cors());

//dodatni paketi
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(require('method-override')());
app.use('/static', express.static(__dirname + '/static'));


//postavljanje sessije (jwt)
app.use(session({ secret: 'boxlio', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

//handlanje errora
if (!isProduction) {
  app.use(errorhandler());
}

//spajanje na DB

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/boxlioapp3');
  mongoose.set('debug', true);
}

//importanje modela, ruta i passporta

require('./models/User');
require('./models/Message');
require('./models/Chat');
require('./models/Opinion');
require('./models/DeliveryJob');
require('./config/passport');
app.use(require('./routes'));

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

let server = app.listen( process.env.PORT || 8000, function(){
  console.log('Listening on port ' + server.address().port);
});

let io = require('socket.io')(server, {pingTimeout: 30000});
let socketHandlers = require('./socketHandlers')(io);
