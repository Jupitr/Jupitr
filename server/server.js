var express = require('express');
var partials = require('express-partials');
// var everyauth = require('everyauth');
var helpers = require('./utils/helpers');
var handler = require('./utils/request-handler');
var config = require('./utils/config');
var https = require('https');
var db = require('../db/config.js');
var users = require('../db/userController.js');


var app = express();

// everyauth.github
//   .entryPath('/auth/github')
//   .appId(config.github.appId)
//   .appSecret(config.github.appSecret)
//   .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
//     var user = {
//       host: 'api.github.com',
//       path: '/organiations',
//       method: 'GET'
//     };
//     helpers.sendGHRequest(https, user, function(res) {
//       var data = '';
//       var org;
//       res.setEncoding('utf8');
//       res.on('data', function (chunk) {
//         data += chunk;
//       });
//       res.on('end', function () {
//         org = JSON.parse(data); 
//         if (helpers.checkAuth(org)) {
//           session.oauth = accessToken;
//           session.uid = githubUserMetadata.login;
//           return session.uid;       
//         }
//         else {
//           console.log('not authorized');
//         }
//       });
//     });
//   })
//   .redirectPath('/');

// // default logout path is /logout
// everyauth.everymodule.handleLogout( function (req, res) {
//   req.logout(); 
//   req.session.uid = null;
//   res.writeHead(303, { 'Location': this.logoutRedirectPath() });
//   res.end();
// });

// app.configure(function() {
//   app.use(partials());
//   app.use(express.bodyParser());
//   app.use(express.static(__dirname + '/public'));
//   app.use(express.cookieParser('infinity divded by infinity'));
//   app.use(express.session());
// });


var testUser = {
  email: 'd@d.com',
  cohort: 'HRRB8',
  zip: 10014,
  currentemployer: {
    name: 'mycompany',
    role: 'programmer',
    startdate: new Date(),
    enddate: new Date()
  }
};

app.get('/', function(req, res) {
  users.addUser(testUser, function() {
    users.sendAllUsers(function(data) {
      res.send(data);
    });
  });
});



module.exports = app;
