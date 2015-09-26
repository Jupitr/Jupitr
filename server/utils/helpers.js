'use strict';
var github = require('octonode');

module.exports = {
  // errorLogger: function (error, req, res, next) {
  //   // log the error then send it to the next middleware 
  //   console.error(error.stack);
  //   next(error);
  // },
  // errorHandler: function (error, req, res, next) {
  //   // send error message to client
  //   // message for gracefull error handling on app
  //   res.send(500, {error: error.message});
  // },
  validateUser: function (req, res, next) {
    if (req.session && req.session.uid) {
      next();
    }
    else {
      res.redirect('/login');
    }
  },

  getOrgs: function (token, cb) {
    var client = github.client(token);
    var me = client.me();
    me.orgs(function(err, body){
      if (!err) {
        return cb(body.reduce(function(total, current){
          return current.login === 'remotebeta' || total;
        }, false));
      }
    });
  },

  checkAuth: function (data, key, prop) {
    data.forEach(function(item){
      if (item.key === prop) {
        return true;
      }
    });
    return false;
  }
};
