var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var everyauth = require('everyauth');
var helpers = require('./utils/helpers');
// var handler = require('./utils/request-handler');
var config = require('./utils/config');
var user = require('../db/userController.js');
var db = require('../db/config.js');

var app = express();

everyauth.github
  .entryPath('/api/github')
  .appId(config.github.appId)
  .appSecret(config.github.appSecret)
  .scope('user')
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    session.oauth = accessToken;
    session.uid = githubUserMetadata.login;
    session.userRecord = {
      name: githubUserMetadata.name,
      githublogin: githubUserMetadata.login,
      email: githubUserMetadata.email,
      githublink: 'https://github.com/' + githubUserMetadata.login
    };
    return session.uid;
  })
  .redirectPath('/auth');

// default logout path is /logout
everyauth.everymodule.logoutPath('/api/logout');
everyauth.everymodule.handleLogout( function (req, res) {
  req.logout(); 
  req.session.destroy(function(err){
    if (err) {
      throw err;
    }
  });
  res.redirect('/#/login');
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

app.get('/api/alluser', function(req, res) {
  helpers.validateUser(req, res, function(){
    user.sendAllUsers(function(users){
      res.json(users);
      res.end();
    });
  });
});

app.get('/auth', function(req, res){
  helpers.checkAuth(req, res, helpers.getOrgs);
});

// app.get('/api/update', function(req, res) {
//   // call update user api; uncomment when done
//   // user.updateUser(req.data, function(){
//     res.sendStatus(200);
//   // });
// });

app.get('/api/profile', function(req, res) {
  helpers.validateUser(req, res, function() {
    console.log('send profile');
    user.findUserProfile(req.session.uid, function(record){
      res.json(record);
    });
  });
});

// app.get('/api/', helpers.validateUser, function(req, res) {
//   res.sendStatus(200);
// });

// temp route to display profile info for deployment testing
app.get('/test' , function(req, res) {
  user.sendAllUsers(function(data) {
    res.send(data);
  });
});

module.exports = app;
