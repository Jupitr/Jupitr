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
  .entryPath('/auth/github')
  .appId(config.github.appId)
  .appSecret(config.github.appSecret)
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
    var user = {
      host: 'api.github.com',
      path: '/organiations',
      method: 'GET'
    };
    helpers.sendGHRequest(https, user, function(res) {
      var data = '';
      var org;
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        org = JSON.parse(data); 
        if (helpers.checkAuth(org)) {
          session.oauth = accessToken;
          session.uid = githubUserMetadata.login;
          return session.uid;       
        }
        else {
          console.log('not authorized');
        }
      });
    });
  })
  .redirectPath('/');

// default logout path is /logout
everyauth.everymodule.handleLogout( function (req, res) {
  req.logout(); 
  req.session.uid = null;
  res.writeHead(303, { 'Location': this.logoutRedirectPath() });
  res.end();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('infinity divded by infinity'));
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'infinity divded by infinity'
}));

app.get('/', helpers.validateUser, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/updateAcc', function(req, res) {
  // call db update api
  res.sendStatus(200);
});

app.get('/api/createAcc', helpers.validateUser, function(req, res) {
  res.sendStatus(200);
});

module.exports = app;