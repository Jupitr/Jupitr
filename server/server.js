var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var everyauth = require('everyauth');
var helpers = require('./utils/helpers');
var user = require('../db/userController.js');
var db = require('../db/config.js');

var passport = require('passport');
var LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
// var util = require('util');

// not sure if necessary
// var connect = require('connect');
var linkedinId, linkedinSecret;

var app = express();

var githubId, githubSecret;

if (process.env.GITHUB_APP_ID && process.env.GITHUB_APP_SECRET) {
  githubId = process.env.APP_ID;
  githubSecret = process.env.APP_SECRET;
} else {
  var config = require('./utils/config');
  githubId = config.github.appId;
  githubSecret = config.github.appSecret;
}

// handle deployed vs local config variables for linkedin
if (process.env.LINKEDIN_APP_ID && process.env.LINKEDIN_APP_SECRET) {
  linkedinId = process.env.LINKEDIN_APP_ID;
  linkedinSecret = process.env.LINKEDIN_APP_SECRET;
} else {
  var config = require('./utils/config');
  linkedinId = config.linkedin.appId;
  linkedinSecret = config.linkedin.appSecret;
}

// everyauth.github
//   .entryPath('/api/github')
//   .appId(githubId)
//   .appSecret(githubSecret)
//   .scope('user')
//   .findOrCreateUser( function (session, accessToken, accessTokenExtra, githubUserMetadata) {
//     session.oauth = accessToken;
//     session.uid = githubUserMetadata.login;
//     session.userRecord = {
//       name: githubUserMetadata.name,
//       githublogin: githubUserMetadata.login,
//       email: githubUserMetadata.email,
//       githublink: 'https://github.com/' + githubUserMetadata.login
//     };
//     return session.uid;
//   })
//   .redirectPath('/auth');


// // default logout path is /logout
// everyauth.everymodule.logoutPath('/api/logout');
// everyauth.everymodule.handleLogout( function (req, res) {
//   req.logout(); 
//   req.session.destroy(function(err){
//     if (err) {
//       throw err;
//     }
//   });
//   res.redirect('/#/login');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client'));
app.use(cookieParser('infinity divded by infinity'));
app.use(session({
  saveUninitialized: true,
  resave: false,
  secret: 'infinity divded by infinity'
}));
// app.use(everyauth.middleware());

/* =============================== BEGIN LINKEDIN AUTH ================================= */

// Initialize Passport. Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Linkedin profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Register the strategy
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
  clientID: linkedinId,
  clientSecret: linkedinSecret,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  // scope: ['r_emailaddress', 'r_basicprofile'],
  state: true,
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));

// Authenticate linkedin
app.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('Success: Authenticated with Linkedin');
    console.log(req.user);
    res.redirect('/#/profile');
  });

app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function(err){
    if (err) {
      throw err;
    }
  });
  res.redirect('/#/login');
});

/* ================================= END LINKEDIN AUTH ================================= */


/* ================================= BEGIN GITHUB AUTH ================================= */

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: githubId,
    clientSecret: githubSecret,
    callbackURL: "http://localhost:3000/auth/github/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // console.log(profile._json.login);
    req.session.oauth = accessToken;
    req.session.uid = profile._json.login;
    req.session.userRecord = {
      name: profile._json.name,
      githublogin: profile._json.login,
      email: profile._json.email,
      githublink: 'https://github.com/' + profile._json.login
    };
    // console.log(req.session);

    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHubwill redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback', 
  // TODO: Remove placeholder failureRedirect when flow is figured out,
  // at least this way, it will be obvious if I break something
  passport.authenticate('github', { failureRedirect: '/somethingwentwrong' }),
  function(req, res) {
    // console.log('Request:', req);
    // console.log('Response:', res);
    res.redirect('/auth');
  });


/* ================================== END GITHUB AUTH ================================== */

// route to get every single user record in db; check if has already requested
app.get('/api/allusers', function(req, res) {
  helpers.validateUser(req, res, function(){
    if (!req.session.sendAllUsers) {
      user.sendAllUsers(function(users){
        req.session.sendAllUsers = true;
        res.json(users);
      });
    }
    else {
      res.end();  
    }
  });
});

// server private route to check if a github user has the right permission
app.get('/auth', function(req, res){
  helpers.checkAuth(req, res, helpers.getOrgs);
});

app.post('/api/update', function(req, res) {
  // call update user api
  user.updateProfile(req.body, function(){
    res.sendStatus(200);
  });
});

// route to get the login user's profile 
app.get('/api/profile', function(req, res) {
  helpers.validateUser(req, res, function() {
    console.log('send profile');
    user.findUserProfile(req.session.uid, function(record){
      res.json(record);
    });
  });
});

// temp route to display profile info for deployment testing
app.get('/test' , function(req, res) {
  user.sendAllUsers(function(data) {
    res.send(data);
  });
});

module.exports = app;
