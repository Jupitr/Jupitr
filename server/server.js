var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var everyauth = require('everyauth');
var helpers = require('./utils/helpers');
var handler = require('./utils/request-handler');
var config = require('./utils/config');
var https = require('https');

var app = express();

everyauth.github
  .entryPath('/github')
  .appId(config.github.appId)
  .appSecret(config.github.appSecret)
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    console.log(githubUserMetadata);
    session.oauth = accessToken;
    session.uid = githubUserMetadata.login;
    return session.uid;
    })
  .redirectPath('/');

// default logout path is /logout
everyauth.everymodule.handleLogout( function (req, res) {
  req.logout(); 
  req.session.destroy(function(err){
    if (err) {
      throw err;
    }
  });
  res.writeHead(303, { 'Location': '/get' });
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

app.get('/', helpers.validateUser, function(req, res) {
  res.sendStatus(200);
});

// app.get('/login', function(req, res) {
//   res.sendStatus(200);
// });

app.get('/api/updateAcc', function(req, res) {
  // call db update api
  res.sendStatus(200);
});

app.get('/api/createAcc', helpers.validateUser, function(req, res) {
  res.sendStatus(200);
});

module.exports = app;
