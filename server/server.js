var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var everyauth = require('everyauth');
var helpers = require('./utils/helpers');
// var handler = require('./utils/request-handler');
var config = require('./utils/config');
var user = require('../db/userController.js');

var app = express();

everyauth.github
  .entryPath('/api/github')
  .appId(config.github.appId)
  .appSecret(config.github.appSecret)
  .scope('user')
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    session.oauth = accessToken;
    session.uid = githubUserMetadata.login;
    return session.uid;
  })
  .redirectPath('/auth');

// default logout path is /logout
everyauth.everymodule.handleLogout( function (req, res) {
  req.logout(); 
  req.session.destroy(function(err){
    if (err) {
      throw err;
    }
  });
  // if status is 303 then FE redirect
  res.sendStatus(303);
  res.end();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser('infinity divded by infinity'));
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'infinity divded by infinity'
}));
app.use(everyauth.middleware());

app.get('/api/home', helpers.validateUser, function(req, res) {
  if (req.body.allUser) {
    user.sendAllUsers(function(users){
      res.sendStatus(200);
      res.json(users);
    });
  }
  else {
    res.sendstatus(200);
  }
});

app.get('/auth', helpers.checkAuth);

app.get('/api/update', function(req, res) {
  // call update user api; uncomment when done
  // user.updateUser(req.data, function(){
    res.sendStatus(200);
  // });
});

app.get('/api/create', helpers.validateUser, function(req, res) {
  user.addUser(req.data, function(){
    res.sendStatus(200);
  });
});


app.get('/api/', helpers.validateUser, function(req, res) {
  res.sendStatus(200);
});

module.exports = app;